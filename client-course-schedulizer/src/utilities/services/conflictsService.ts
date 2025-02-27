import { forEach } from "lodash";
import * as AllMoment from "moment";
import moment, { Moment } from "moment";
import { extendMoment } from "moment-range";
import { Day, getLocationString, getSectionName, Schedule, Section } from "utilities";
import { Instructor } from "utilities/interfaces";

const { range } = extendMoment(AllMoment);

interface ConflictData {
  days: Day[];
  endTime: Moment;
  indexes: number[];
  instructors: Section["instructors"];
  room: string;
  sectionName: string;
  startTime: Moment;
  term: Section["term"];
}

export const findConflicts = (schedule: Schedule): Schedule => {
  // flatten the schedule into a single array with just the data being checked for conflicts
  const dataToCheck: ConflictData[] = [];
  forEach(schedule.courses, (course, courseIndex) => {
    forEach(course.sections, (section, sectionIndex) => {
      forEach(section.meetings, (meeting, meetingIndex) => {
        meeting.isConflict = false;
        const startTimeMoment = moment(meeting.startTime, "h:mm A");
        dataToCheck.push({
          days: meeting.days,
          endTime: moment(startTimeMoment).add(meeting.duration, "minutes"),
          indexes: [courseIndex, sectionIndex, meetingIndex],
          instructors: section.instructors,
          room: getLocationString(meeting.location),
          sectionName: getSectionName(course, section),
          startTime: startTimeMoment,
          term: section.term,
        });
      });
    });
  });

  // loop through each pair of meetings and mark conflicts
  forEach(dataToCheck, (meeting1, i) => {
    forEach(dataToCheck, (meeting2, j) => {
      const range1 = range(meeting1.startTime, meeting1.endTime);
      const range2 = range(meeting2.startTime, meeting2.endTime);
      const meeting2IncludesDay = (day: Day) => {
        return meeting2.days.includes(day);
      };
      const meeting2IncludesInstructor = (instructor: Instructor) => {
        return meeting2.instructors.includes(instructor);
      };

      if (
        i !== j &&
        range1.overlaps(range2) &&
        meeting1.term === meeting2.term &&
        meeting1.days.some(meeting2IncludesDay) &&
        (meeting1.instructors.some(meeting2IncludesInstructor) ||
          meeting1.room === meeting2.room) &&
        meeting1.sectionName !== meeting2.sectionName
      ) {
        const [ci1, si1, mi1] = meeting1.indexes;
        const [ci2, si2, mi2] = meeting2.indexes;
        schedule.courses[ci1].sections[si1].meetings[mi1].isConflict = true;
        schedule.courses[ci2].sections[si2].meetings[mi2].isConflict = true;
      }
    });
  });
  return schedule;
};
