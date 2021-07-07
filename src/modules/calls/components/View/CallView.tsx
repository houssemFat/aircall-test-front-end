import React from "react";
import {
  ChevronLeftOutlined,
  Flex,
  Skeleton,
  Spacer,
  Tractor,
  Button,
  OutboundOutlined,
  InboundOutlined,
  Tag,
  SpinnerOutlined,
  ArchiveOutlined,
  ClockOutlined,
  CallOutlined,
  ForwardOutlined,
  CalendarOutlined,
  Typography, InformationOutlined, BannerOutlined
} from "@aircall/tractor";
import { useMutation, useQuery } from "@apollo/client";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { formatDuration, intervalToDuration } from "date-fns";


import { CALL_QUERY } from "../../graphql/calls.queries";
import { ListFieldStyle } from "../../models/types";
import { dateFnsLocalesByAppLocale, HumanizeMilleSeconds } from "../../../shared/utils/DateHelpers";
import { FormattedMessage } from "react-intl";
import { ARCHIVE_CALL_MUTATION } from "../../graphql/calls.mutations";
import { IRootState } from "../../../shared/redux/store";
import { Call } from "../../models/calls";
import CallNotes from "./CallNotes";


interface CallViewArchiveProps {
  call: Call,
  onChildAction: Function
}

function CallViewArchive({call, onChildAction}: CallViewArchiveProps) {
  const [archive, {loading}] = useMutation(ARCHIVE_CALL_MUTATION);
  return (
      <Flex className={ListFieldStyle.text}>
        <Spacer space="0" p={0}>
          <Button onClick={(event) => {
            alert(call.id);
            archive({variables: {id: call.id}})
            onChildAction();
            event.stopPropagation()
          }}>
            {
              loading ? <SpinnerOutlined/> : <ArchiveOutlined/>
            } Icon anatomy

          </Button>
        </Spacer>
      </Flex>
  )
}


interface RouterParams {
  id: string
}

interface CallsListItemProps {
  locale: string
}

const DirectionMsg = () => <FormattedMessage id="call.fields.direction"/>;
//const FromMsg = () => <FormattedMessage id="call.fields.from"/>;
const CreatedAtMsg = () => <FormattedMessage id="call.fields.created_at"/>;
const ToMsg = () => <FormattedMessage id="call.fields.to"/>;
const DurationMsg = () => <FormattedMessage id="call.fields.duration"/>;
const ViaMsg = () => <FormattedMessage id="call.fields.via"/>;
const IsArchivedMsg = () => <FormattedMessage id="call.fields.is_archived"/>;

const CallTypeMsg = () => <FormattedMessage id="call.fields.call_type"/>;


const ListTitleMsg = () => <FormattedMessage id="calls.page.title"/>;

function CallView({locale}: CallsListItemProps) {
  const {id} = useParams<RouterParams>()
  const history = useHistory();
  const {loading, error, data, refetch} = useQuery(CALL_QUERY, {
    variables: {
      id: id,
    }
  });
  const onAction = () => {
    refetch()
  }
  let viewContent;
  if (loading) {
    viewContent = <Spacer space="s" p="16px 0" borderRadius={8} width={"100%"} margin={"auto"} alignItems="center"
                          direction="vertical">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {Array.from(Array(5)).map((_, index) => {
        return <Flex key={index}>
          <Spacer space="m" py={20}>
            <Skeleton width={120} height={16}/>

            <Skeleton width={120} height={16}/>
          </Spacer>

        </Flex>
      })
      }
    </Spacer>;
  }

  if (error) {
    viewContent = <p>
      <Button size="small" variant="primary"
              onClick={(event) => {
                refetch()
              }}>

      </Button>
    </p>;
  }

  if (!viewContent && data && data.call) {
    const call = data.call;
    viewContent = (<Flex flexDirection="column"
                         justifyContent="center"
                         alignItems={"center"} p={15} flexGrow={1}>

          <Flex>
            <Flex justifyContent="justify-between">

              {call.from}
              <Flex>
                <CallViewArchive onChildAction={onAction} call={call}/>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDirection="column" justifyContent="center"  flexGrow={1} p={15}>
            <Spacer space="l" direction="vertical">
              {/* duration & to */}
              <Flex>
                <Flex>
                  <Spacer space="s">
                    <Spacer space="s">
                      <ClockOutlined size={18}/>
                      <DurationMsg/>
                    </Spacer>
                    {HumanizeMilleSeconds(call.duration)}
                  </Spacer>
                </Flex>
              </Flex>

              <Flex>
                <Spacer space="s">
                  <Spacer space="s">
                    <CallOutlined size={18}/>
                    <ToMsg/>
                  </Spacer>
                  {call.to}
                </Spacer>
              </Flex>


              <Flex>
                <Spacer space="s">
                  <Spacer space="s">
                    <BannerOutlined size={18}/>
                    <DirectionMsg/>
                  </Spacer>

                  <Spacer space="s">
                    {call.direction}
                    {call.direction === "outbound" ? <OutboundOutlined color={"red.base"}/> :
                        <InboundOutlined color={"green.light"}/>}
                  </Spacer>

                </Spacer>
              </Flex>

              <Flex>
                <Spacer space="s">
                  <Spacer space="s">
                    <InformationOutlined size={18}/>
                    <CallTypeMsg/>
                  </Spacer>

                  <Spacer space="s">
                    {call.call_type}
                  </Spacer>

                </Spacer>
              </Flex>


              <Flex>
                <Spacer space="s">
                  <Spacer space="s">
                    <ForwardOutlined size={18}/>
                    <ViaMsg/>
                  </Spacer>

                  <Spacer space="s">
                    {call.via}
                  </Spacer>

                </Spacer>
              </Flex>

              <Flex>
                <Spacer space="s">
                  <Spacer space="s">
                    <CalendarOutlined size={18}/>
                    <CreatedAtMsg/>
                  </Spacer>

                  <Spacer space="s">
                    <Flex>
                      {
                        formatDuration(
                            intervalToDuration({
                              start: new Date(call.created_at),
                              end: new Date()
                            }),
                            {locale: dateFnsLocalesByAppLocale[locale]} // Pass the locale as an option
                        )
                      }

                    </Flex>
                  </Spacer>

                </Spacer>
              </Flex>

              <Flex className={ListFieldStyle.text + ' xs:hidden'}>
                {
                  call.is_archived ? <Tag bg="red.base" size="small" color="#fff" space="xxs">
                    <IsArchivedMsg/>
                    {/*<TrashFilled size="12px" />*/}
                  </Tag> : ''
                }

              </Flex>

              <Flex>
                <CallNotes onChildAction={onAction} id={call.id} notes={call.notes} />
              </Flex>
            </Spacer>

          </Flex>


        </Flex>
    )
  }

  return (
      <Flex flexDirection="column" className="w-full" p={4}>
        <Tractor>
          <Flex justifyContent="space-between">
            <Flex>
              <Spacer space="s" direction="vertical" py={20}>
                <Typography variant="displayM"><ListTitleMsg/></Typography>
              </Spacer>
            </Flex>

            <Spacer space="s" direction="vertical" py={20}>
              <Button mode="link" onClick={() => {
                history.goBack()
              }}>
                <ChevronLeftOutlined/> Back
              </Button>
            </Spacer>
          </Flex>
          <Flex flexDirection="column" borderRadius={3} bg={"white"} flexGrow={1} justifyContent="center" alignItems="center">
            {viewContent}
          </Flex>
        </Tractor>
      </Flex>

  )
}

const mapStateToProps = (state: IRootState) => {
  return {
    locale: state.intlReducer.locale
  }
};
export default connect(mapStateToProps)(CallView);
