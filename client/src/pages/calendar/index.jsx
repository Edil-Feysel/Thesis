import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import Grid from "@mui/material/Unstable_Grid2";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Topbar from "../global/Topbar";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const them = useTheme();
  const [theme, colorMode] = useMode();

  const colors = tokens(them.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Box m="20px">
                <Header
                  title="Schedule"
                  subtitle="Check Your Schedule and Upcomming Event"
                />
                <Grid container spacing={2}>
                  <Grid xs={12} md={4}>
                   
                    
                      <List>
                        {currentEvents.map((event) => (
                          <ListItem
                            key={event.id}
                            sx={{
                              backgroundColor: colors.greenAccent[500],
                              margin: "10px 0",
                              borderRadius: "2px",
                            }}
                          >
                       
                          </ListItem>
                        ))}
                      </List>
                   
                  </Grid>
                  <Grid xs={12} md={8}>
               
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell>Event</TableCell>
                              <TableCell>Task</TableCell>
                              <TableCell>Group</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {currentEvents.map((event) => (
                              <TableRow key={event.id}>
                                <TableCell>
                                  {formatDate(event.start, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </TableCell>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.task}</TableCell>
                                <TableCell>{event.group}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                   
                  </Grid>
                </Grid>
              </Box>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Calendar;
