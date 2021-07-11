import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useTableSearch } from "./searchTabDesc";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
const createData = (id, name, description) => {
  return {
    id,
    name,
    description,
  };
}
const rows = [
  createData(
    1,
    "razdaet",
    "Поднять порт / посмотреть сколько маков на порту (нужен 1, если больше: роутер - проверяем куда подключен кабель, настройки. на прямую - настройки, вирусы ) / пере загрузить соседа и посмтреть пере получит ли он свои настройки / при необходимости проверить натройки на оборудовании клиента / если все ок удаляем деск. сохраняем конфиг"
  ),
  createData(
    2,
    "podmena",
    "Проверяем настройки на оборудовании клиента / поднимаем порт / смотрим arp / если все данные соответствуют (ip/mac), удаляем деск. сохраняем конфиг"
  ),
  createData(
    3,
    "flapp",
    "Смотрим log (действительно ли часто падал линк) / смотрим когда сложили / смотрим uptime свитча (возможно свитч бутнулся, а кто-то не сохраняет конфиги) / если клиент возле оборудования и сможет его отключить поднимаем мониторим будут ли падения линка / если так же флапает ложим оратно и составляем заявку / если не флапает удаляем деск. сохраняем конфиг"
  ),
  createData(
    4,
    "flood (broadcast, unicast, multicast)",
    "Проверить настройки на оборудовании клиента / на свитче сможем посмотреть только соответствующую статистику вх./вых. пакетов по линку / остальное смотреться на узле, если все ок удаляем деск. сохраняем конфиг"
  ),
  createData(
    5,
    "flood (ipv6)",
    "Отключить ipv6 на оборудовании клиента / поднять порт и если D-link в логах могут показыватся соответствующие дропы / остальное смотреться на узле, если все ок удаляем деск. сохраняем конфиг"
  ),
  createData(
    6,
    "flood (arp)",
    "Проверить настройки на оборудовании клиента / проверить на оборудование на вирусы / остальное смотрится на узле / если все ок удаляем деск. сохраняем конфиг"
  ),
  createData(
    7,
    "vstraivaetsa",
    "Смотрим правильная ли привязка на свитче (если она есть) / настройки на оборудовании клиента / трассировку на клиента к которому встраиваеться / в отдельных случаях можно пере выдать ip / если все ок удаляем деск. сохраняем конфиг"
  ),
 createData(
    8,
    "mnogo_makov",
    "Поднять порт / посмотреть сколько маков на порту (нужен 1, если больше: роутер - проверяем куда подключен кабель, настройки(отключить режим точки доступа). на прямую - настройки, вирусы ) / убедится что это не тупарь или антена / если все ок удаляем деск. сохраняем конфиг"
  ),
];

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{ width: "5%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th">{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>{row.description}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const Descriptions = () => {
  const [search, setSearch] = useState(null);
  const { filteredData, loading } = useTableSearch({
    search,
    retrieve: rows,
  });
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <TextField
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <Row key={row.id} row={row} loading={loading} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
