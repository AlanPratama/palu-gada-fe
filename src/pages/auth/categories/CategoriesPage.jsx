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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CategoriesApi from "../../../apis/categoriesApi";
import CrudModal from "./components/CrudModal";

const CategoriesPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");

  const fetchCategories = useCallback(async () => {
    await CategoriesApi.getCategories();
  }, []);

  const handleCategoryAction = useCallback(
    async (action, category = null) => {
      switch (action) {
        case "tambah":
          await CategoriesApi.createCategories(category);
          fetchCategories();
          break;
        case "ubah":
          await CategoriesApi.editCategories(category);
          fetchCategories();
          break;
        case "hapus":
          await CategoriesApi.deleteCategories(selectedCategory.id);
          fetchCategories();
          break;
        default:
          break;
      }
      onOpenChange(false);
    },
    [selectedCategory, onOpenChange, fetchCategories]
  );

  const handleOpenModal = useCallback(
    (type, category = null) => {
      setModalType(type);
      setSelectedCategory(category);
      onOpen();
    },
    [onOpen]
  );

  const filteredData = useMemo(() => {
    return items.filter((category) =>
      category?.name?.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, items]);

  const pages = useMemo(() => {
    return Math.ceil(filteredData.length / rowsPerPage) || 0;
  }, [filteredData.length, rowsPerPage]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const dayName = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
    }).format(date);
    const day = date.getDate();
    const monthName = new Intl.DateTimeFormat("en-GB", {
      month: "short",
    }).format(date);
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${dayName}, ${day} ${monthName} ${year} (${time})`;
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Card className="p-4">
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
                onClear={() => onSearchChange("")}
                onValueChange={onSearchChange}
              />
            </div>
            <Button
              variant="solid"
              color="primary"
              className="font-bold"
              onPress={() => handleOpenModal("Tambah")}
            >
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

        <Table
          className="overflow-auto sm:max-w-full max-w-[250px]"
          shadow="none"
          color="primary"
          selectionMode="single"
          aria-label="Categories table"
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
              .map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{formatDate(category.createdAt)}</TableCell>
                  <TableCell>{formatDate(category.updatedAt)}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly variant="light">
                          •••
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu className="dark:text-white">
                        <DropdownItem
                          key="edit"
                          startContent={<ion-icon name="pencil" />}
                          color="secondary"
                          onPress={() => handleOpenModal("Ubah", category)}
                        >
                          Ubah
                        </DropdownItem>
                        <DropdownItem
                          startContent={<ion-icon name="trash" />}
                          color="danger"
                          onPress={() => handleOpenModal("Hapus", category)}
                        >
                          Hapus
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <CardFooter>
          {pages > 0 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
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
          selectedCategory={selectedCategory}
          onClose={() => onOpenChange(false)}
          onSubmit={handleCategoryAction}
        />
      )}
    </>
  );
};

export default CategoriesPage;
