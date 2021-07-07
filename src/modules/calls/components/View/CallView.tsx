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
  Typography, InformationOutlined, BannerOutlined, TransferOutlined, SquircleButton
} from "@aircall/tractor";
import { useMutation, useQuery } from "@apollo/client";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { format, formatDuration, intervalToDuration } from "date-fns";


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
          {/* <Button
              size={"small"}
              variant="destructive"
              onClick={(event) => {
                event.stopPropagation()
                archive({variables: {id: call.id}})
                onChildAction();
              }}>
            {
              loading ? <SpinnerOutlined /> : <ArchiveOutlined/>
            }

          </Button>*/
          }
          <SquircleButton
              onClick={(event) => {
                archive({variables: {id: call.id}})
                onChildAction({operation: 'archive'})
              }} size="xSmall"
              variant="destructive"
              icon={loading ? SpinnerOutlined : ArchiveOutlined}  shadow={false}
              spin={loading}/>

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
const FromMsg = () => <FormattedMessage id="call.fields.from"/>;
const CreatedAtMsg = () => <FormattedMessage id="call.fields.created_at"/>;
const ToMsg = () => <FormattedMessage id="call.fields.to"/>;
const DurationMsg = () => <FormattedMessage id="call.fields.duration"/>;
const ViaMsg = () => <FormattedMessage id="call.fields.via"/>;
const IsArchivedMsg = () => <FormattedMessage id="call.fields.is_archived"/>;
const StatusMsg = () => <FormattedMessage id="call.fields.status"/>;
const CallTypeMsg = () => <FormattedMessage id="call.fields.call_type"/>;


const ListTitleMsg = () => <FormattedMessage id="calls.view.title"/>;

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
      <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Flex py={4}>Error token :( </Flex>
        <Button size="small" variant="primary"
                onClick={(event) => {
                  // TODO , fixme :
                  //  this is just a hack to get new token
                  window.location.reload();
                }}>
          <FormattedMessage id="common.retry"/>
        </Button>
      </Flex>
    </p>;
  }

  if (!viewContent && data && data.call) {
    const call = data.call;
    viewContent = (<Flex flexDirection="column"
                         justifyContent="center"
                         alignItems={"center"} py={15} flexGrow={1}>


          <Flex flexDirection="column" justifyContent="center" flexGrow={1} p={15}>
            <Spacer space="l" direction="vertical">

              {/* duration & to */}
              <Flex>
                <Flex justifyContent={"space-between"} width={"100%"}>
                  <Spacer space="s" alignItems={"center"}>
                    <Typography variant="subheading">
                      <Spacer space="s" alignItems={"center"}>
                        <Flex>
                          <CallOutlined size={18}/>
                        </Flex>
                        <FromMsg/>
                      </Spacer>
                    </Typography>
                    {call.from}
                  </Spacer>
                  <CallViewArchive onChildAction={onAction} call={call}/>
                </Flex>
              </Flex>

              {/* duration & to */}
              <Flex>
                <Spacer space="s" alignItems={"center"}>
                  <Typography variant="subheading">
                    <Spacer space="s" alignItems={"center"}>
                      <Flex>
                        <ClockOutlined size={18}/>
                      </Flex>
                      <DurationMsg/>
                    </Spacer>
                  </Typography>
                  {HumanizeMilleSeconds(call.duration)}
                </Spacer>
              </Flex>

              <Flex>
                <Spacer space="s" alignItems={"center"}>
                  <Typography variant="subheading">
                    <Spacer space="s" alignItems={"center"}>
                      <Flex>
                        <TransferOutlined size={18}/>
                      </Flex>
                      <ToMsg/>
                    </Spacer>
                  </Typography>
                  {call.to}
                </Spacer>
              </Flex>


              <Flex>
                <Spacer space="s" alignItems={"center"}>
                  <Typography variant="subheading">
                    <Spacer space="s" alignItems={"center"}>
                      <Flex>
                        <ForwardOutlined size={18}/>
                      </Flex>
                      <ViaMsg/>
                    </Spacer>
                  </Typography>
                  {call.via}
                </Spacer>
              </Flex>

              <Flex>
                <Spacer space="s" alignItems={"center"}>
                  <Typography variant="subheading">
                    <Spacer space="s" alignItems={"center"}>
                      <Flex>
                        <BannerOutlined size={18}/>
                      </Flex>
                      <DirectionMsg/>
                    </Spacer>
                  </Typography>
                  <Spacer space="s" alignItems={"center"}>
                    {call.direction}
                    {call.direction === "outbound" ? <OutboundOutlined color={"red.base"}/> :
                        <InboundOutlined color={"green.light"}/>}
                  </Spacer>
                </Spacer>
              </Flex>

              <Flex>
                <Spacer space="s" alignItems={"center"}>
                  <Typography variant="subheading">
                    <Spacer space="s" alignItems={"center"}>
                      <Flex>

                        <InformationOutlined size={18}/>
                      </Flex>
                      <CallTypeMsg/>
                    </Spacer>
                  </Typography>
                  <Tag size="small" variant="blue">
                    {call.call_type}
                  </Tag>

                </Spacer>
              </Flex>


              <Flex>
                <Spacer space="s">
                  <Typography variant="subheading">
                    <Spacer space="s" alignItems={"center"}>
                      <Flex>
                        <CalendarOutlined size={18}/>
                      </Flex>
                      <CreatedAtMsg/>
                    </Spacer>
                  </Typography>
                  <Flex flexDirection={"column"} pt={1}>
                    {
                      formatDuration(
                          intervalToDuration({
                            start: new Date(call.created_at),
                            end: new Date()
                          }),
                          {locale: dateFnsLocalesByAppLocale[locale]} // Pass the locale as an option
                      )
                    }
                    <Typography variant="body"
                                pt={4}>{format(new Date(call.created_at), 'iii dd/mm/yy HH:MM:SS', {locale: dateFnsLocalesByAppLocale[locale]})}</Typography>
                  </Flex>
                </Spacer>
              </Flex>
              <Flex>
                <Spacer space="s" alignItems={"center"}>
                  <Typography variant="subheading">
                    <Spacer space="s" alignItems={"center"}>
                      <Flex>

                        <InformationOutlined size={18}/>
                      </Flex>
                      <StatusMsg/>
                    </Spacer>
                  </Typography>

                  <Flex className={ListFieldStyle.text + ' xs:hidden'}>
                    {
                      call.is_archived ? <Tag size="small" variant="red">
                        <IsArchivedMsg/>
                      </Tag> : ''
                    }

                  </Flex>

                </Spacer>
              </Flex>


              <Flex>
                <CallNotes onChildAction={onAction} id={call.id} notes={call.notes}/>
              </Flex>
            </Spacer>

          </Flex>


        </Flex>
    )
  }

  return (
      <Flex flexDirection="column" className="w-full"  flexGrow={1}>
        <Tractor>
          <Flex justifyContent="space-between" py={20}>
            <Flex>
              <Spacer space="s" direction="vertical" >
                <Typography variant="displayM"><ListTitleMsg/></Typography>
              </Spacer>
            </Flex>

            <Spacer space="0" direction="vertical">
              <Button mode="link" size="xSmall" onClick={() => {
                history.goBack()
              }}>
                <ChevronLeftOutlined size={12}/> Back
              </Button>
            </Spacer>
          </Flex>
          <Flex flexDirection="column" borderRadius={3} bg={"white"} flexGrow={1} justifyContent="center"
                alignItems="center">
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
