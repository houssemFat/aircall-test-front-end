import React, { ReactEventHandler } from "react";
import { Spacer, Button, ChevronLeftOutlined, ChevronRightOutlined, Flex } from "@aircall/tractor";
import { FormattedMessage} from "react-intl";

interface PaginationProps {
  offset?: number,
  pagesCount?: number,
  onNext?: ReactEventHandler,
  onPrevious?: ReactEventHandler
}


const NextMsg = () => <FormattedMessage id="common.next"/>;
const PreviousMsg = () => <FormattedMessage id="common.previous"/>;

const Pagination = ({offset = 0, pagesCount,  onNext, onPrevious}: PaginationProps) => {

  // data of type @see PaginatedCalls
  //{/*{)}*/}
  return (<Flex className={"w-full"}>
        <Spacer space="s">
          <Button size="xSmall"
              disabled={offset === 0}
              onClick={onPrevious}>
            <Flex justifyContent={"center"}>
              <ChevronLeftOutlined/>
              <span  className={"xs:hidden"}><PreviousMsg/></span>
            </Flex>

          </Button>
          <Button size="xSmall"
              disabled={pagesCount ? (offset === pagesCount - 1) : true}
              onClick={onNext}>

            <Flex justifyContent={"center"} alignItems={"center"}>
              <span  className={"xs:hidden"}><NextMsg/></span>  <ChevronRightOutlined/>
            </Flex>
          </Button>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          {/*<Button >
            Basic List <ArrowDownFilled size="16px"/>
          </Button>
          <Button size="small">
            Basic List <ChevronDownOutlined/>
          </Button>
          <Button size="regular">
            Basic List <ChevronDownOutlined/>
          </Button>
          <Button size="large">
            Basic List <ChevronDownOutlined/>
          </Button>*/}
        </Spacer>
      </Flex>
  );
}
export default  Pagination ;
