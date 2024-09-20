import {
  Button,
  Card,
  CardHeader,
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
  User,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import PropTypes from "prop-types";
import UsersApi from "../../../apis/usersApi";
import store from "../../../redux/store";
import { selectUser } from "../../../redux/users/usersSlice";
import { ModalCreateAdmin } from "./components/ModalCreateAdmin";

export const UsersPage = ({ onlySelect }) => {
  const userList = useSelector((state) => state.users.items);
  const selectedUser = useSelector((state) => state.users.selectedItem);
  const total = useSelector((state) => state.users.total);
  const loading = useSelector((state) => state.users.isLoading);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [debounceSearchQuery] = useDebounce(filterValue, 700);
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([selectedUser?.id?.toString() ?? "0"])
  );

  useEffect(() => {
    store.dispatch(selectUser([...selectedKeys][0]));
  }, [selectedKeys]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((e) => {
    setFilterValue(e);
  }, []);

  useEffect(() => {
    UsersApi.getAll(page - 1, rowsPerPage, debounceSearchQuery);
  }, [page, rowsPerPage, debounceSearchQuery, isOpen]);

  return (
    <Card className="h-fit w-full p-4">
      <CardHeader className="flex flex-col">
        <div className="flex flex-row w-full justify-between gap-2">
          <div className="flex flex-row sm:gap-4 gap-6">
            <h1 className="font-bold text-2xl">USERS</h1>
            <Input
              isClearable
              className=""
              placeholder="Cari berdasarkan nama..."
              startContent={<ion-icon name="search-outline" />}
              value={filterValue}
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
          </div>
          {!onlySelect && (
            <Button
              variant="solid"
              color="primary"
              className="font-bold"
              onPress={onOpen}
            >
              <ion-icon name="add-circle" size="small" />
              Tambah Admin
            </Button>
          )}
        </div>
        <div className="flex flex-row w-full justify-between pt-4 -mb-4 text-gray-500 text-sm">
          <p className="my-auto">Total {total} users</p>
          <label className="flex items-center">
            Baris per halaman:
            <select
              className="bg-transparent outline-none"
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

      {/* Tabel */}
      <div className="overflow-x-auto">
        <Table
          className="min-w-full"
          shadow="none"
          color="primary"
          selectionMode="single"
          aria-label="Users table"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          bottomContent={
            total > 0 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  isDisabled={loading}
                  color="primary"
                  page={page}
                  total={Math.ceil(total / rowsPerPage)}
                  onChange={(page) => setPage(page)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>AKUN</TableColumn>
            <TableColumn>KOTA</TableColumn>
            <TableColumn>GENDER</TableColumn>
            <TableColumn>KATEGORI</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              loading ? <Spinner label="Memuat..." /> : "Tidak ada data"
            }
          >
            {userList.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <User
                      avatarProps={{
                        radius: "lg",
                        src: user.photoUrl,
                      }}
                      description={user.email}
                      name={user.username ?? "(Belum ada nama)"}
                    >
                      {user.email}
                    </User>
                  </TableCell>
                  <TableCell>{user?.district?.districtName ?? "-"}</TableCell>
                  <TableCell>{user?.userGender ?? "-"}</TableCell>
                  <TableCell>
                    {user?.userCategories.map((category, index) => (
                      <span key={index}>
                        {category.category.name}
                        {index < user.userCategories.length - 1 && ", "}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* <ModalDetail isOpen={isOpen} onOpenChange={onOpenChange} selectedItem={selectedItem} key={selectedItem?.id} /> */}
      <ModalCreateAdmin isOpen={isOpen} onOpenChange={onOpenChange} />
    </Card>
  );
};

UsersPage.propTypes = {
  onlySelect: PropTypes.bool,
};
