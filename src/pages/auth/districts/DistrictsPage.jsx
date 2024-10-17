import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import DistrictsApi from "../../../apis/districtsApi";
import CrudModal from "./components/CrudModal";
import { formatDate } from "../../../utils/dateFormater";

function DistrictsPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.districts);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const [debounceSearchQuery] = useDebounce(filterValue, 700);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDistricts = useCallback(async () => {
    await DistrictsApi.getAllDistricts(
      page - 1,
      rowsPerPage,
      debounceSearchQuery
    );
    setIsLoading(false);
  }, [debounceSearchQuery, rowsPerPage, page]);

  const handleDistrictAction = useCallback(
    async (action, district = null) => {
      setIsLoading(true);
      switch (action) {
        case "tambah":
          await DistrictsApi.createDistricts(district);
          break;
        case "ubah":
          await DistrictsApi.editDistricts(district);
          break;
        case "hapus":
          await DistrictsApi.deleteDistricts(selectedDistrict.id);
          break;
        default:
          break;
      }
      fetchDistricts();
      onOpenChange(false);
    },
    [selectedDistrict, onOpenChange, fetchDistricts]
  );

  const handleOpenModal = useCallback(
    (type, district = null) => {
      setModalType(type);
      setSelectedDistrict(district);
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
    fetchDistricts();
  }, [fetchDistricts]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl">KOTA</h1>
              <Input
                isClearable
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
            <p className="text-gray-500 text-sm my-auto">Total {total} kota</p>
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
          aria-label="Districts table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>KOTA</TableColumn>
            <TableColumn>PROVINSI</TableColumn>
            <TableColumn>KABUPATEN</TableColumn>
            <TableColumn>DIBUAT PADA</TableColumn>
            <TableColumn>DIUBAH PADA</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              isLoading ? <Spinner label="Memuat..." /> : "Tidak ada data"
            }
          >
            {items.map((district) => (
              <TableRow key={district.id}>
                <TableCell>{district.id}</TableCell>
                <TableCell>{district.districtName}</TableCell>
                <TableCell>{district.regency}</TableCell>
                <TableCell>{district.province}</TableCell>
                <TableCell>{formatDate(district?.createdAt)}</TableCell>
                <TableCell>{formatDate(district?.updatedAt)}</TableCell>
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
                        onPress={() => handleOpenModal("Ubah", district)}
                      >
                        Ubah
                      </DropdownItem>
                      <DropdownItem
                        startContent={<ion-icon name="trash" />}
                        color="danger"
                        onPress={() => handleOpenModal("Hapus", district)}
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
          selectedDistrict={selectedDistrict}
          onClose={() => onOpenChange(false)}
          onSubmit={handleDistrictAction}
        />
      )}
    </>
  );
}

export default DistrictsPage;
