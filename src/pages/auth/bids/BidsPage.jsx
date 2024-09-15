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
import { useDebounce } from "use-debounce";
import BidsApi from "../../../apis/bidsApi";

const BidsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.bids);
  const [selectedBid, setSelectedBid] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const fetchBids = useCallback(async () => {
    await BidsApi.getAllBids(page - 1, rowsPerPage, debounceSearchQuery);
  }, [debounceSearchQuery, rowsPerPage, page]);

  const handleBidAction = useCallback(
    async (action, bid = null) => {
      switch (action) {
        case "ubah":
          await BidsApi.editBids(bid);
          break;
        case "hapus":
          await BidsApi.deleteBids(selectedBid.id);
          break;
        default:
          break;
      }
      fetchBids();
      onOpenChange(false);
    },
    [selectedBid, onOpenChange, fetchBids]
  );

  const handleOpenModal = useCallback(
    (type, bid = null) => {
      setModalType(type);
      setSelectedBid(bid);
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
    fetchBids();
  }, [fetchBids]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl">NEGOSIASI</h1>
              <Input
                isClearable
                className="w-3/4"
                placeholder="Cari berdasarkan nama..."
                startContent={<ion-icon name="search-outline" />}
                value={filterValue}
                onClear={() => onSearchChange("")}
                onValueChange={onSearchChange}
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4">
            <p className="text-gray-500 text-sm my-auto">
              Total {total} negosiasi
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
          aria-label="Bids table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>JUDUL</TableColumn>
            <TableColumn>DESKRIPSI</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>PENGUNGGAH</TableColumn>
            <TableColumn>AKSI</TableColumn>
            <TableColumn>Error</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Tidak ada data">
            {items.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell>{bid.id}</TableCell>
                <TableCell>{bid.title}</TableCell>
                <TableCell>{bid.description}</TableCell>
                <TableCell>
                  <Chip
                    color={bid.status === "AVAILABLE" ? "success" : "warning"}
                    variant="dot"
                  >
                    {bid.status}
                  </Chip>
                </TableCell>
                <TableCell>{bid?.user?.email}</TableCell>
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
                        onPress={() => handleOpenModal("Ubah", bid)}
                      >
                        Ubah
                      </DropdownItem>
                      <DropdownItem
                        startContent={<ion-icon name="information-circle" />}
                        color="primary"
                        onPress={() => {
                          handleOpenModal("Detail", bid);
                        }}
                      >
                        Detail
                      </DropdownItem>
                      <DropdownItem
                        startContent={<ion-icon name="trash" />}
                        color="danger"
                        onPress={() => {
                          handleOpenModal("Hapus", bid);
                        }}
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
    </>
  );
};

export default BidsPage;
