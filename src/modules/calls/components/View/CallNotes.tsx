import {
  Spacer,
  Button,
  Box,
  Flex,
  TextFieldInput,
  Typography,
  SpinnerOutlined, EditOutlined, CounterBadge
} from "@aircall/tractor";
import React, { useState } from "react";

import { Note } from "../../models/calls";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { useMutation } from "@apollo/client";
import { ADD_NOTE_MUTATION } from "../../graphql/calls.mutations";

interface CallViewNotesProps {
  id: string,
  notes: Array<Note>,
  onChildAction: Function,
  intl: IntlShape
}


const SendMsg = () => <FormattedMessage id="common.save"/>;

function CallNotesComponent({id, intl, notes, onChildAction}: CallViewNotesProps) {

  const [newNoteContent, setNewNoteContent] = useState("")
  const [sendNote, {loading}] = useMutation(ADD_NOTE_MUTATION);
  return (
      <Flex flexDirection={"column"} width={"100%"}>
        <Typography variant="subheading" mb={2}>
          <Spacer>
            Notes
            <CounterBadge count={notes.length} variant="black"/>
          </Spacer>
        </Typography>

        {
          notes.map((note, index) => {
            return <Flex key={index}>
              <Box width="400px" mx="auto" py={4} borderBottom={"solid .2rem #eaefef"}>
                <Typography textAlign="left" ellipsis={{
                  lines: 3
                }}>
                  {note.content}
                </Typography>
              </Box>

            </Flex>
          })
        }
        <Flex mt={15}>

          <Spacer direction="vertical" space={"s"} width={"100%"}>
            <TextFieldInput
                value={newNoteContent}
                onChange={event => setNewNoteContent(event.target.value)}
                placeholder={intl.formatMessage({id: "calls.actions.add_note_input"})} size="large"/>
            <Flex justifyContent="flex-end">
              <Button size="small" variant="primary"
                      onClick={(event) => {
                        sendNote({variables: {id: id, content: newNoteContent}})
                        onChildAction();
                        event.stopPropagation()
                      }} disabled={!newNoteContent}>
                <SendMsg/> {loading ? <SpinnerOutlined/> : <EditOutlined/>}
              </Button>
            </Flex>
          </Spacer>
        </Flex>
      </Flex>
  )
}

export default injectIntl(CallNotesComponent);
