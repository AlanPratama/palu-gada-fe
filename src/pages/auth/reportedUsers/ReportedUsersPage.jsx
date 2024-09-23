import {
  Button,
  Card,
  CardFooter,
  CardHeader,
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
import ReportedUsersApi from "../../../apis/reportedUsers";
import { Link } from "react-router-dom";

const ReportedUsersPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.reportedUsers);
  const [selectedReportedUser, setSelectedReportedUser] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const user = useSelector((state) => state.users.selectedItem);
  const [isLoading, setIsLoading] = useState(true);

  const [showBy, setShowBy] = useState(new Set(["all"]));
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const fetchreportedUsers = useCallback(
    async (filter) => {
      if (filter == "all") {
        await ReportedUsersApi.getAllReportedUsers(
          page - 1,
          rowsPerPage,
          debounceSearchQuery
        );
        setIsLoading(false);
      } else {
        await ReportedUsersApi.getAllReportedUsersByUser(
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

  const handleOpenModal = useCallback(
    (type, reportedUser = null) => {
      setModalType(type);
      setSelectedReportedUser(reportedUser);
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
    fetchreportedUsers([...showBy][0]);
  }, [fetchreportedUsers, showBy]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex sm:flex-row items-center flex-col sm:gap-0 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl w-fit">
                LAPORAN PENGGUNA
              </h1>
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
                  Pilih Pengguna
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
                  <DropdownItem key="all">Seluruh Laporan</DropdownItem>
                  <DropdownItem key="user">Berdasarkan Pengguna</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {[...showBy][0] == "user" && (
            <div className="flex justify-between w-full">
              {user?.email ? (
                <p className="text-gray-500">
                  dari pengguna <span className="font-bold">{user?.email}</span>
                </p>
              ) : (
                <p className="text-red-500">Pilih pengguna terlebih dahulu</p>
              )}
            </div>
          )}
          <div className="flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4">
            <p className="text-gray-500 text-sm my-auto">
              Total {total} laporan
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
          aria-label="reportedUsers table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>PELAPOR</TableColumn>
            <TableColumn>PENGGUNA YANG DILAPORKAN</TableColumn>
            <TableColumn>PESAN</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              isLoading ? <Spinner label="Memuat..." /> : "Tidak ada data"
            }
          >
            {items.map((reportedUser, index) => (
              <TableRow key={reportedUser.id + " - " + index}>
                <TableCell>
                  {reportedUser.id ?? index + 1 + rowsPerPage * (page - 1)}
                </TableCell>
                <TableCell>{reportedUser?.user?.email}</TableCell>
                <TableCell>{reportedUser?.reportedUser?.username}</TableCell>
                <TableCell>{reportedUser?.message}</TableCell>
                <TableCell>
                  <Link to={"/report-user/" + reportedUser.id}>
                    <Button
                      className="font-bold"
                      size="sm"
                      color="primary"
                      variant="solid"
                      startContent={
                        <ion-icon name="open-outline" size="small" />
                      }
                    >
                      Detail
                    </Button>
                  </Link>
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
          selectedReportedUser={selectedReportedUser?.reportedUser}
          onClose={() => onOpenChange(false)}
        />
      )}
    </>
  );
};

export default ReportedUsersPage;
