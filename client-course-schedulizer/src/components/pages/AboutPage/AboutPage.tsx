import { Grid } from "@material-ui/core";
import { NewTabLink, Page } from "components/reuseables";
import React from "react";
import { team, TeamMember } from "utilities";
import { TeamMemberProfile, TextSection } from ".";
import "./AboutPage.scss";

/* A page with information about the project
  with references */
export const AboutPage = () => {
  return (
    <Page>
      <AboutVision />
      <AboutTeam />
      <AboutCode />
      <AboutReport />
      <AboutResources />
    </Page>
  );
};

const AboutVision = () => {
  return (
    <TextSection
      body={
        <>
          Every year, all department chairs at Calvin must develop a schedule for their department’s
          classes based on a spreadsheet provided to them by the Registrar. The schedule must
          contain the times, professors, and rooms for every class section in the department and the
          schedule must satisfy the following constraints:
          <ul>
            <li>Only one section can be in a room at a time</li>
            <li>A professor can only teach one section at a time</li>
            <li>
              Two sections taken together cannot be offered at the same time (e.g. CS 212 is often
              taken together with MATH 251 and ENGR 220)
            </li>
            <li>Professors can only teach courses when they are available</li>
            <li>Professors can only teach courses they are qualified to teach</li>
            <li>Professors must/cannot teach consecutive classes depending on their preferences</li>
            <li>A room’s capacity cannot be exceeded by the expected enrollment in the class</li>
            <li>Faculty teaching loads cannot be “too high” or “too low”</li>
          </ul>
          These constraints make it extremely difficult for the department chair to create a
          schedule without a tool to help them. We propose building a web application, named the
          Course Schedulizer, that will allow department chairs to visualize and manipulate their
          department course schedules. It will provide:
          <ul>
            <li>The ability to upload and export department schedules via CSV</li>
            <li>Integration with the spreadsheets provided and required by the Registrar</li>
            <li>Two views to visualize the schedule data (by location and by instructor)</li>
            <li>Options to color the data by level, instructor, location, or prefix</li>
            <li>Functionality to create, read, update, and delete class sections</li>
            <li>A load summary for each instructor in the department</li>
            <li>Schedule conflict detection and resolution suggestions (for honors portion)</li>
            <li>An optimized user interface with an efficient use of screen space</li>
            <li>An extensible interface to integrate with future systems (e.g. Workday)</li>
          </ul>
          By offering these features and improvements on the functionality previously implemented by
          Professor Pruim and Professor VanderLinden, the Course Schedulizer will allow department
          chairs to easily create their schedules.
          <br />
          <br />
          For an Honors Project, Charles is completing a second project relating to constraint
          problem satisfaction alongside the Course Schedulizer. By employing constraint
          satisfaction techniques, Charles hopes to allow department chairs the ability to upload a
          list of classes, professors, rooms, and times to the Course Schedulizer web application
          and have the system create a schedule with no conflicts.
        </>
      }
      title="Vision"
    />
  );
};

const AboutTeam = () => {
  return (
    <TextSection
      body={
        <Grid container direction="column" justify="flex-start" spacing={2}>
          {team.map((member: TeamMember) => {
            return <TeamMemberProfile key={member.name} member={member} />;
          })}
        </Grid>
      }
      title="Team"
    />
  );
};

const AboutCode = () => {
  return (
    <TextSection
      body={
        <>
          This website is our code built and deployed. Feel free to play around with the site. Our
          code repository is{" "}
          <NewTabLink href="https://github.com/senior-knights/course-schedulizer">
            hosted on GitHub
          </NewTabLink>
          . We have two persistent branches: <code>production</code> and <code>develop</code>.{" "}
          <code>production</code> is the working, stable build of the web application and{" "}
          <code>develop</code> is the less-stable, bleeding-edge build of our Course Schedulizer
          app. Please feel free to look around the code and interact with us on the discussion board
          or by posting issues. The honors constraint satisfaction package is also{" "}
          <NewTabLink href="https://github.com/senior-knights/aima-typescript-csp">
            hosted on GitHub
          </NewTabLink>
          . For details on the development process, please view the respective ReadMes on GitHub.
        </>
      }
      title="Code"
    />
  );
};

const AboutReport = () => {
  return (
    <TextSection
      body={
        <ul>
          <li>
            <NewTabLink href="https://docs.google.com/document/d/e/2PACX-1vQPQ1Qhu0jCVThVbNsUFxV8fB56fHgVf4Dnhfkf6EU_7627iMVuSHntW8VxF0j0Aw/pub">
              Updated Proposal
            </NewTabLink>{" "}
            - 12.15.2020
          </li>
          <li>
            <NewTabLink href="https://docs.google.com/document/d/e/2PACX-1vQTy2A83LmPKrZhQ5_LCN6a3ow4UHxknIq4OjgimPU-Brfyl6fAhb9aQmxjNvg5tA/pub">
              Original Proposal
            </NewTabLink>{" "}
            - 10.15.2020
          </li>
        </ul>
      }
      title="Report"
    />
  );
};

const AboutResources = () => {
  return (
    <TextSection
      body={
        <ul>
          <li>
            <NewTabLink href="https://computing.calvin.edu/">
              Computing@Calvin Department Website
            </NewTabLink>
          </li>
          <li>
            <NewTabLink href="https://web.microsoftstream.com/video/cee6b774-a010-4220-a0d8-c6a6c5240d84?st=2456">
              Status Report 1
            </NewTabLink>{" "}
            - 12.01.2020
          </li>
          <li>
            <NewTabLink href="https://docs.google.com/document/d/e/2PACX-1vS8sc8-Vs1qkfyGpelPXsuwvSQif3IFlnsZNoak3P7DbBmSYxWDgXL2ig-OJk8VJVHny2lCUZxCyCfJ/pub">
              Honors Status Report 1
            </NewTabLink>{" "}
            - 12.01.2020
          </li>
          <li>
            <NewTabLink href="https://docs.google.com/presentation/d/e/2PACX-1vQrjMY5c-gnlvX5AAD1zIqRY0P5BLppQFT5y-3fxeR0TzuEvzUpDADYUGY_3J4TBe1PL3sq9rEqUdRA/pub?start=false&loop=false&delayms=3000">
              Presentation 1
            </NewTabLink>{" "}
            - 12.01.2020
          </li>
        </ul>
      }
      title="Resources"
    />
  );
};
