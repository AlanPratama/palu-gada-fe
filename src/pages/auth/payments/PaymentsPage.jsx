import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaymentsApi from "../../../apis/paymentsApi";
import CrudModal from "./components/CrudModal";
import { useDebounce } from "use-debounce";

const PaymentsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.payments);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const fetchPayments = useCallback(async () => {
    await PaymentsApi.getAllPayments(page - 1, rowsPerPage, debounceSearchQuery);
  }, [debounceSearchQuery, rowsPerPage, page]);

  const handlePaymentAction = useCallback(
    async (action, payment = null) => {
      switch (action) {
        case "ubah":
          await PaymentsApi.editPayments(payment);
          break;
        case "hapus":
          await PaymentsApi.deletePayments(selectedPayment.id);
          break;
        default:
          break;
      }
      fetchPayments();
      onOpenChange(false);
    },
    [selectedPayment, onOpenChange, fetchPayments]
  );

  const handleOpenModal = useCallback(
    (type, payment = null) => {
      setModalType(type);
      setSelectedPayment(payment);
      onOpen();
    },
    [onOpen]
  );

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <>
      <Card className='p-4'>
        <CardHeader className='flex flex-col'>
          <div className='flex flex-row w-full justify-between'>
            <div className='flex sm:flex-row flex-col sm:gap-4 gap-6'>
              <h1 className='font-bold sm:text-2xl text-xl'>PEMBAYARAN</h1>
              <Input
                isClearable
                className='w-[150%]'
                placeholder='Cari berdasarkan nama...'
                startContent={<ion-icon name='search-outline' />}
                value={filterValue}
                onClear={() => onSearchChange("")}
                onValueChange={onSearchChange}
              />
            </div>
          </div>
          <div className='flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4'>
            <p className='text-gray-500 text-sm my-auto'>Total {total} payment</p>
            <label className='flex items-center text-gray-500 text-small'>
              Baris per halaman:
              <select className='bg-transparent outline-none text-gray-500 text-small' value={rowsPerPage} onChange={onRowsPerPageChange}>
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='15'>15</option>
              </select>
            </label>
          </div>
        </CardHeader>

        <Table
          className='overflow-auto sm:max-w-full max-w-[250px]'
          shadow='none'
          color='primary'
          selectionMode='single'
          aria-label='Payments table'
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>BANK</TableColumn>
            <TableColumn>TOTAL</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>PEMBAYAR</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody emptyContent='Tidak ada data'>
            {items.map((payment, index) => (
              <TableRow key={payment.id + " - " + index}>
                <TableCell>{payment.id ?? index + 1 + rowsPerPage * (page - 1)}</TableCell>
                <TableCell className='capitalize'>{payment.paymentType.replace("_", " ")}</TableCell>
                <TableCell className='uppercase'>{payment.bank}</TableCell>
                <TableCell>{`Rp ${payment.amount.toLocaleString()}`}</TableCell>
                <TableCell>
                  <Chip color={payment.status === "FINISH" ? "success" : "warning"} variant='flat'>
                    {payment.status}
                  </Chip>
                </TableCell>
                <TableCell>{payment?.user?.email}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant='light'>
                        •••
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu className='dark:text-white'>
                      <DropdownItem
                        startContent={<ion-icon name='information-circle' />}
                        color='primary'
                        onPress={() => {
                          handleOpenModal("Detail", payment);
                        }}
                      >
                        Detail
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardFooter>
          {total > 0 && (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='primary'
                page={page}
                total={Math.ceil(total / rowsPerPage)}
                onChange={setPage}
              />
            </div>
          )}
        </CardFooter>
      </Card>

      {isOpen && (
        <CrudModal
          isOpen={isOpen}
          modalType={modalType}
          selectedPayment={selectedPayment}
          onClose={() => onOpenChange(false)}
          onSubmit={handlePaymentAction}
        />
      )}
    </>
  );
};

export default PaymentsPage;
