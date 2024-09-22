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
import CrudModal from "./components/CrudModal";
import PayoutsApi from "../../../apis/payoutsApi";

const PayoutsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.payouts);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const user = useSelector((state) => state.users.selectedItem);
  const [isLoading, setIsLoading] = useState(true);

  const [showBy, setShowBy] = useState(new Set(["all"]));
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const fetchPayouts = useCallback(
    async (filter) => {
      if (filter == "all") {
        await PayoutsApi.getAllPayouts(
          page - 1,
          rowsPerPage,
          debounceSearchQuery
        );
        setIsLoading(false);
      } else {
        await PayoutsApi.getAllPayoutsByUser(
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
    async (id, status) => {
      setIsLoading(true);
      await PayoutsApi.updatePayoutStatus(id, status);
      fetchPayouts("all");
      onOpenChange(false);
    },
    [onOpenChange, fetchPayouts]
  );

  const handleOpenModal = useCallback(
    (type, payout = null) => {
      setModalType(type);
      setSelectedPayout(payout);
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
    fetchPayouts([...showBy][0]);
  }, [fetchPayouts, showBy]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl">
                TRANSAKSI KELUAR
              </h1>
              {[...showBy][0] == "all" && (
                <Input
                  isClearable
                  className="w-[150%]"
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
                  <DropdownItem key="all">All Payout</DropdownItem>
                  <DropdownItem key="user">Payout By User</DropdownItem>
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
              Total {total} payout
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
          className="overflow-auto sm:max-w-full max-w-[250px]"
          shadow="none"
          color="primary"
          selectionMode="single"
          aria-label="Payouts table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TIPE</TableColumn>
            <TableColumn>DESTINASI</TableColumn>
            <TableColumn>JUMLAH</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>PEMILIK</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              isLoading ? <Spinner label="Memuat..." /> : "Tidak ada data"
            }
          >
            {items.map((payout, index) => (
              <TableRow key={payout.id + " - " + index}>
                <TableCell>
                  {payout.id ?? index + 1 + rowsPerPage * (page - 1)}
                </TableCell>
                <TableCell className="capitalize">
                  {payout.payoutType.replace("_", " ")}
                </TableCell>
                <TableCell className="uppercase">
                  {payout.destinationNumber}
                </TableCell>
                <TableCell>{`Rp ${payout.amount.toLocaleString()}`}</TableCell>
                <TableCell>
                  <Chip
                    color={
                      payout.payoutStatus === "FAILED"
                        ? "danger"
                        : payout.payoutStatus === "SUCCESS"
                        ? "success"
                        : "warning"
                    }
                    variant="flat"
                  >
                    {payout.payoutStatus}
                  </Chip>
                </TableCell>
                <TableCell>{payout?.user?.email}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        •••
                      </Button>
                    </DropdownTrigger>
                    {payout.payoutStatus === "PENDING" && (
                      <DropdownMenu className="dark:text-white">
                        <DropdownItem
                          startContent={
                            <ion-icon name="alert-circle-outline" />
                          }
                          color="primary"
                          onPress={() => {
                            handleOpenModal("Detail", payout);
                          }}
                        >
                          Detail
                        </DropdownItem>
                        <DropdownItem
                          startContent={
                            <ion-icon name="checkmark-circle-outline" />
                          }
                          color="success"
                          onPress={() => {
                            handleOpenModal("Setujui", payout);
                          }}
                        >
                          Setujui
                        </DropdownItem>
                        <DropdownItem
                          startContent={
                            <ion-icon name="close-circle-outline" />
                          }
                          color="danger"
                          onPress={() => {
                            handleOpenModal("Tolak", payout);
                          }}
                        >
                          Tolak
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                    <DropdownMenu className="dark:text-white">
                      <DropdownItem
                        startContent={<ion-icon name="alert-circle-outline" />}
                        color="primary"
                        onPress={() => {
                          handleOpenModal("Detail", payout);
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
          selectedPayout={selectedPayout}
          onClose={() => onOpenChange(false)}
          onSubmit={handleAction}
        />
      )}
    </>
  );
};

export default PayoutsPage;
