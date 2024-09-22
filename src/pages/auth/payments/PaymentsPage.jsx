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
  Spinner,
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
import { useDebounce } from "use-debounce";
import PaymentsApi from "../../../apis/paymentsApi";
import CrudModal from "./components/CrudModal";

const PaymentsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.payments);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const user = useSelector((state) => state.users.selectedItem);
  const [isLoading, setIsLoading] = useState(true);

  const [showBy, setShowBy] = useState(new Set(["all"]));
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const fetchPayments = useCallback(
    async (filter) => {
      if (filter == "all") {
        await PaymentsApi.getAllPayments(
          page - 1,
          rowsPerPage,
          debounceSearchQuery
        );
        setIsLoading(false);
      } else {
        await PaymentsApi.getAllPaymentsByUser(
          user?.id ?? 0,
          page - 1,
          rowsPerPage,
          debounceSearchQuery
        );
        setIsLoading(false);
      }
    },
    [debounceSearchQuery, rowsPerPage, page, user]
  );

  const handleAction = useCallback(
    async (action, selectedPayment) => {
      setIsLoading(true);
      if (action == "cancel") {
        await PaymentsApi.cancelPayment(selectedPayment);
      }
      setPage(1);
      fetchPayments();
      onOpenChange(false);
    },
    [onOpenChange, fetchPayments]
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
    fetchPayments([...showBy][0]);
  }, [fetchPayments, showBy]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl">TRANSAKSI MASUK</h1>
              {[...showBy][0] == "all" && (
                <Input
                  isClearable
                  placeholder="Cari berdasarkan nama..."
                  startContent={<ion-icon name="search-outline" />}
                  value={filterValue}
                  onClear={() => onSearchChange("")}
                  onValueChange={onSearchChange}
                />
              )}
            </div>
            <div className="flex gap-2">
              {[...showBy][0] == "user" && (
                <Button onPress={() => handleOpenModal("Pilih User")}>
                  Select User
                </Button>
              )}

              <Dropdown>
                <DropdownTrigger>
                  <Button color={"primary"} isIconOnly>
                    <ion-icon name="funnel-outline"></ion-icon>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown Variants"
                  color={"primary"}
                  variant={"faded"}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={showBy}
                  onSelectionChange={setShowBy}
                  className="dark:text-white"
                >
                  <DropdownItem key="all">All Payment</DropdownItem>
                  <DropdownItem key="user">Payment By User</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {[...showBy][0] == "user" && (
            <div className="flex justify-between w-full">
              {user?.email ? (
                <p className="text-gray-500">
                  dari user <span className="font-bold">{user?.email}</span>
                </p>
              ) : (
                <p className="text-red-500">Pilih terlebih dahulu user</p>
              )}
            </div>
          )}
          <div className="flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4">
            <p className="text-gray-500 text-sm my-auto">
              Total {total} payment
            </p>
            <label className="flex items-center text-gray-500 text-small">
              Baris per halaman:
              <select
                className="bg-transparent outline-none text-gray-500 text-small"
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </CardHeader>

        <Table
          className="overflow-auto"
          shadow="none"
          color="primary"
          selectionMode="single"
          aria-label="Payments table"
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
          <TableBody
            emptyContent={
              isLoading ? <Spinner label="Memuat..." /> : "Tidak ada data"
            }
          >
            {items.map((payment, index) => (
              <TableRow key={payment.id + " - " + index}>
                <TableCell>
                  {payment.id ?? index + 1 + rowsPerPage * (page - 1)}
                </TableCell>
                <TableCell className="capitalize">
                  {payment.paymentType.replace("_", " ")}
                </TableCell>
                <TableCell className="uppercase">{payment.bank}</TableCell>
                <TableCell>{`Rp ${payment.amount.toLocaleString()}`}</TableCell>
                <TableCell>
                  <Chip
                    color={
                      payment.status === "CANCEL"
                        ? "danger"
                        : payment.status === "SETTLEMENT"
                        ? "success"
                        : "warning"
                    }
                    variant="flat"
                  >
                    {payment.status}
                  </Chip>
                </TableCell>
                <TableCell>{payment?.user?.email}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        •••
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu className="dark:text-white">
                      <DropdownItem
                        startContent={<ion-icon name="information-circle" />}
                        color="primary"
                        onPress={() => {
                          handleOpenModal("Detail", payment);
                        }}
                      >
                        Detail
                      </DropdownItem>
                      {payment.status === "PENDING" && (
                        <DropdownItem
                          startContent={
                            <ion-icon name="alert-circle-outline"></ion-icon>
                          }
                          color="danger"
                          onPress={() => {
                            handleOpenModal("Cancel", payment);
                          }}
                        >
                          Cancel
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardFooter>
          {total > 0 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
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
          onSubmit={handleAction}
        />
      )}
    </>
  );
};

export default PaymentsPage;
