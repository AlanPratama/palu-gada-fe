import {
  Button,
  Card,
  CardHeader,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import dummyData from "../../../data/dummyData";
import { useCallback, useMemo, useState } from "react";

export default function CategoriesPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");

  const filteredData = useMemo(() => {
    return dummyData.categories.filter((category) =>
      category.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue]);

  const pages = useMemo(() => {
    return filteredData.length
      ? Math.ceil(filteredData.length / rowsPerPage)
      : 0;
  }, [filteredData, rowsPerPage]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((e) => {
    setFilterValue(e.target.value);
  }, []);

  return (
    <Card className="h-fit w-full p-4">
      <CardHeader className="flex flex-col">
        <div className="flex flex-row w-full justify-between">
          <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
            <h1 className="font-bold sm:text-2xl text-xl">KATEGORI</h1>
            <Input
              isClearable
              className="w-[150%]"
              placeholder="Cari berdasarkan nama..."
              startContent={<ion-icon name="search-outline" />}
              value={filterValue}
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
          </div>
          <Button variant="solid" color="primary" className="font-bold">
            <ion-icon name="add-circle" size="small" />
            Tambah
          </Button>
        </div>
        <div className="flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4">
          <p className="text-gray-500 text-sm my-auto">
            Total {filteredData.length} kategori
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

      {/* Tabel */}
      <Table
        shadow="none"
        color="primary"
        selectionMode="single"
        aria-label="Categories table"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAMA</TableColumn>
          <TableColumn>DIBUAT PADA</TableColumn>
          <TableColumn>DIUBAH PADA</TableColumn>
          <TableColumn>AKSI</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Tidak ada data">
          {filteredData
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
            .map((category) => {
              return (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {new Date(category.createAt).toLocaleDateString("en-GB")}{" "}
                    {new Date(category.createAt).toLocaleTimeString("en-GB")}
                  </TableCell>
                  <TableCell>
                    {new Date(category.updatedAt).toLocaleDateString("en-GB")}{" "}
                    {new Date(category.updatedAt).toLocaleTimeString("en-GB")}
                  </TableCell>
                  <TableCell>
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button isIconOnly variant="light">
                          •••
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex flex-col gap-2 py-2">
                          <Button variant="light" color="secondary">
                            <ion-icon name="pencil-outline" />
                            Ubah
                          </Button>
                          <Button variant="light" color="danger">
                            <ion-icon name="trash-outline" />
                            Hapus
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Card>
  );
}
