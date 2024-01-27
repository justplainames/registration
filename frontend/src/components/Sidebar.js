import { Flex, Icon } from "@chakra-ui/react";
import {
  IconHome,
  IconScoreboard,
  IconTournament,
  IconFriends,
  IconPoo,
} from "@tabler/icons-react";
import { List, ListItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { EventContext } from "../helpers/EventContext";

export default function Sidebar() {
  const { eventState } = useContext(EventContext);

  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <NavLink to="/">
          <Flex align="center">
            <Icon as={IconHome} boxSize={5} mr={2} />
            Dashboard
          </Flex>
        </NavLink>
      </ListItem>

      {eventState.eventName !== "Select Event" && (
        <>
          <ListItem>
            <NavLink to="/participants">
              <Flex align="center">
                <Icon as={IconFriends} boxSize={5} mr={2} />
                Participants List
              </Flex>
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink to="/scoring">
              <Flex align="center">
                <Icon as={IconTournament} boxSize={5} mr={2} />
                Scoring
              </Flex>
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink to="/brackets">
              <Flex align="center">
                <Icon as={IconScoreboard} boxSize={5} mr={2} />
                Brackets
              </Flex>
            </NavLink>
          </ListItem>
        </>
      )}

      <ListItem>
        <NavLink to="/fullstackTest">
          <Flex align="center">
            <Icon as={IconPoo} boxSize={5} mr={2} />
            PooPoo Counter
          </Flex>
        </NavLink>
      </ListItem>
    </List>
  );
}
