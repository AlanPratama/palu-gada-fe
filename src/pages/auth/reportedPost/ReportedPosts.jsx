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
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ReportedPostsApi from "../../../apis/reportedPostsApi";
import CrudModal from "./components/CrudModal";

const ReportedPostsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.reportedPosts);
  const [selectedReportedPost, setSelectedReportedPost] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const user = useSelector((state) => state.users.selectedItem);
  const [isLoading, setIsLoading] = useState(true);

  const [showBy, setShowBy] = useState(new Set(["all"]));
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const fetchReportedPosts = useCallback(
    async (filter) => {
      if (filter == "all") {
        await ReportedPostsApi.getAllReportedPosts(
          page - 1,
          rowsPerPage,
          debounceSearchQuery
        );
        setIsLoading(false);
      } else {
        await ReportedPostsApi.getAllReportedPostsByUser(
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
    (type, reportedPost = null) => {
      setModalType(type);
      setSelectedReportedPost(reportedPost);
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
    fetchReportedPosts([...showBy][0]);
  }, [fetchReportedPosts, showBy]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl w-fit">
                LAPORAN POSTINGAN
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
          aria-label="ReportedPosts table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>PENGGUNA</TableColumn>
            <TableColumn>POSTINGAN</TableColumn>
            <TableColumn>PESAN</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              isLoading ? <Spinner label="Memuat..." /> : "Tidak ada data"
            }
          >
            {items.map((reportedPost, index) => (
              <TableRow key={reportedPost.id + " - " + index}>
                <TableCell>
                  {reportedPost.id ?? index + 1 + rowsPerPage * (page - 1)}
                </TableCell>
                <TableCell>{reportedPost?.user?.email}</TableCell>
                <TableCell>{reportedPost?.post?.title}</TableCell>
                <TableCell>{reportedPost?.message}</TableCell>
                <TableCell>
                  <Link to={"/report-post/" + reportedPost.id}>
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
          selectedReportedPost={selectedReportedPost}
          onClose={() => onOpenChange(false)}
        />
      )}
    </>
  );
};

export default ReportedPostsPage;
