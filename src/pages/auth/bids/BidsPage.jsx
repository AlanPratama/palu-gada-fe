import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import BidsApi from "../../../apis/bidsApi";

const BidsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.bids);
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const fetchBids = useCallback(async () => {
    await BidsApi.getAllBids(page - 1, rowsPerPage, debounceSearchQuery);
  }, [debounceSearchQuery, rowsPerPage, page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return;
    }

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
    fetchBids();
  }, [fetchBids]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl">TAWARAN</h1>
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
            <Button
              variant="solid"
              color="primary"
              className="font-bold"
              onPress={() => alert("Blom ada backendnya")}
            >
              <ion-icon name="add-circle" size="small" />
              Tambah
            </Button>
          </div>
          <div className="flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4">
            <p className="text-gray-500 text-sm my-auto">
              Total {total} tawaran
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
            <TableColumn>HARGA TAWARAN</TableColumn>
            <TableColumn>STATUS TAWARAN</TableColumn>
            <TableColumn>EMAIL PENAWAR</TableColumn>
            <TableColumn>JUDUL POSTINGAN</TableColumn>
            <TableColumn>BUDGET</TableColumn>
            <TableColumn>KOTA</TableColumn>
            <TableColumn>TENGGAT</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Tidak ada data">
            {items.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell>{bid.id}</TableCell>
                <TableCell>Rp {bid.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    color={bid.status === "ACCEPTED" ? "success" : "warning"}
                    variant="dot"
                  >
                    {bid.status}
                  </Chip>
                </TableCell>
                <TableCell>{bid.user.email}</TableCell>
                <TableCell>{bid.post.title}</TableCell>
                <TableCell>
                  Rp {bid.post.budgetMin.toLocaleString()} - Rp{" "}
                  {bid.post.budgetMax.toLocaleString()}
                </TableCell>
                <TableCell>{bid.post.district.districtName}</TableCell>
                <TableCell>{formatDate(bid.post.deadline)}</TableCell>
                <TableCell>
                  <Link to={"/bid/" + bid.id}>
                    <Button
                      className="font-bold"
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
    </>
  );
};

export default BidsPage;
