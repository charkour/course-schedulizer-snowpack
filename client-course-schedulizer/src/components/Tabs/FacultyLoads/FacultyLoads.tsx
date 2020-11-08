/* eslint-disable react/jsx-key */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as FacultyRow,
} from "@material-ui/core";
import React, { useContext, useMemo } from "react";
import { Column, useTable } from "react-table";
import { Course, Schedule, Section, Term } from "../../../utilities/interfaces/dataInterfaces";
import { ScheduleContext } from "../../../utilities/services/context";

interface FacultyRow {
  faculty: string;
  fallCourseSections?: string;
  fallHours?: number;
  loadNotes?: string;
  otherDuties?: string;
  otherHours?: number;
  springCourseSections?: string;
  springHours?: number;
  summerCourseSections?: string;
  summerHours?: number;
  totalHours?: number;
}

interface UpdateRowParams {
  course: Course;
  newRow: FacultyRow;
  prevRow: FacultyRow;
  section: Section;
  sectionName: string;
  termName?: "fall" | "spring" | "summer";
}

const updateRow = ({
  course,
  newRow,
  prevRow,
  section,
  sectionName,
  termName,
}: UpdateRowParams) => {
  const termCourseSectionProp = `${termName}CourseSections` as
    | "fallCourseSections"
    | "springCourseSections"
    | "summerCourseSections";
  const termHoursProp = `${termName}Hours` as "fallHours" | "springHours" | "summerHours";
  newRow[termCourseSectionProp] = prevRow?.[termCourseSectionProp]
    ? `${prevRow[termCourseSectionProp]}, ${sectionName}`
    : sectionName;

  newRow[termHoursProp] = prevRow?.[termHoursProp]
    ? Number(prevRow[termHoursProp]) + (section.facultyHours || course.facultyHours)
    : section.facultyHours || course.facultyHours;
};

const createTable = (schedule: Schedule): FacultyRow[] => {
  const newTableData: FacultyRow[] = [];
  schedule.courses.forEach((course) => {
    course.sections.forEach((section) => {
      section.instructors.forEach((instructor) => {
        const instructorFullName = `${instructor.firstName} ${instructor.lastName}`;
        const sectionName = `${course.prefixes[0]}-${course.number}-${section.letter}`;
        const newFacultyRow: FacultyRow = {
          faculty: instructorFullName,
        };
        const [prevAddedFacultyRow] = newTableData.filter((data) => {
          return data.faculty === instructorFullName;
        });
        const updateArgs = {
          course,
          newRow: newFacultyRow,
          prevRow: prevAddedFacultyRow,
          section,
          sectionName,
        };
        switch (section.term) {
          case Term.Fall:
            updateRow({ ...updateArgs, termName: "fall" });
            break;
          case Term.Spring:
            updateRow({ ...updateArgs, termName: "spring" });
            break;
          case Term.Summer:
            updateRow({ ...updateArgs, termName: "summer" });
            break;
          default:
            break;
        }
        if (prevAddedFacultyRow) {
          newTableData[newTableData.indexOf(prevAddedFacultyRow)] = newFacultyRow;
        } else {
          newTableData.push(newFacultyRow);
        }
      });
    });
  });
  return newTableData.map((row) => {
    return {
      ...row,
      totalHours: (row.fallHours || 0) + (row.springHours || 0) + (row.summerHours || 0),
    };
  });
};

export const FacultyLoads = () => {
  const { schedule } = useContext(ScheduleContext);

  const data = useMemo<FacultyRow[]>(() => {
    return createTable(schedule);
  }, [schedule]);

  // TODO: Add Other Duties/Hours and Load Notes
  const columns = useMemo<Column<FacultyRow>[]>(() => {
    return [
      { Header: "Faculty", accessor: "faculty" },
      { Header: "Fall Course Sections", accessor: "fallCourseSections" },
      { Header: "Fall Hours", accessor: "fallHours" },
      { Header: "Spring Course Sections", accessor: "springCourseSections" },
      { Header: "Spring Hours", accessor: "springHours" },
      { Header: "Summer Course Sections", accessor: "summerCourseSections" },
      { Header: "Summer Hours", accessor: "summerHours" },
      { Header: "Total Hours", accessor: "totalHours" },
    ];
  }, []);
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  // https://react-table.tanstack.com/docs/quick-start
  return (
    // apply the table props
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => {
              return (
                // Apply the header row props
                <FacultyRow {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => {
                      return (
                        // Apply the header cell props
                        <TableCell {...column.getHeaderProps()}>
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </TableCell>
                      );
                    })
                  }
                </FacultyRow>
              );
            })
          }
        </TableHead>
        {/* Apply the table body props */}
        <TableBody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <FacultyRow {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </TableCell>
                      );
                    })
                  }
                </FacultyRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
