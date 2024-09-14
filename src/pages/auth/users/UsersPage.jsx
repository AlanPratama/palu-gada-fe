import {
  Button,
  Card,
  CardHeader,
  Chip,
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
import UsersApi from "../../../apis/usersApi";
import { ModalDetail } from "./components/ModalDetail";

export const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const userList = useSelector((state) => state.users.items);
  const total = useSelector((state) => state.users.total);
  const error = useSelector((state) => state.users.error);
  const loading = useSelector((state) => state.users.isLoading);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((e) => {
    setFilterValue(e);
  }, []);

  const handleDetailPress = (item) => {
    onOpen();
    setSelectedItem(item);
  };

  useEffect(() => {
    UsersApi.getAll(page - 1, rowsPerPage, debounceSearchQuery);
  }, [page, rowsPerPage, debounceSearchQuery]);

  return (
    <Card className='h-fit w-full p-4'>
      <CardHeader className='flex flex-col'>
        <div className='flex flex-row w-full justify-between'>
          <div className='flex sm:flex-row flex-col sm:gap-4 gap-6'>
            <h1 className='font-bold sm:text-2xl text-xl'>USERS</h1>
            <Input
              isClearable
              className='w-[150%]'
              placeholder='Cari berdasarkan nama...'
              startContent={<ion-icon name='search-outline' />}
              value={filterValue}
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
          </div>
          <Button variant='solid' color='primary' className='font-bold'>
            <ion-icon name='add-circle' size='small' />
            Tambah
          </Button>
        </div>
        <div className='flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4'>
          <p className='text-gray-500 text-sm my-auto'>Total {total} users</p>
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

      {/* Tabel */}
      <div className='overflow-x-auto'>
        <Table
          className='min-w-full'
          shadow='none'
          color='default'
          selectionMode='single'
          aria-label='Users table'
          bottomContent={
            total > 0 ? (
              <div className='flex w-full justify-center'>
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  isDisabled={loading}
                  color='primary'
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
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>USERNAME</TableColumn>
            <TableColumn>DIUBAH PADA</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody emptyContent={error} loadingContent={<Spinner />} loadingState={loading}>
            {userList.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <User
                      avatarProps={{ radius: "lg", src: user.photoUrl ?? "/astronot.png" }}
                      description={user.email}
                      name={user.name ?? "(Belum di kasih nama)"}
                    >
                      {user.email}
                    </User>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    {user.roles.map((item) => (
                      <Chip
                        className='capitalize'
                        color={item.name.includes("USER") ? "primary" : "danger"}
                        size='sm'
                        variant='flat'
                        key={item.id}
                      >
                        {item.name}
                      </Chip>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button variant='light' color='primary' onPress={() => handleDetailPress(user)}>
                      <ion-icon name='eye-outline' />
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ModalDetail isOpen={isOpen} onOpenChange={onOpenChange} selectedItem={selectedItem} key={selectedItem?.id} />
    </Card>
  );
};
