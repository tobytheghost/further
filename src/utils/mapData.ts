import { type TableDataItem } from "../data/tableData";

export type FormattedRowData = TableDataItem & {
  status: "Approved" | "Denied";
  signUpUTCDateTime: Date;
  investmentUTCDateTime: Date;
  refundRequestUTCDateTime: Date;
  isOldTos: boolean;
};

const SIGN_UP_DATE_THRESHOLD = new Date("2020-01-02");

const OLD_PHONE_APPROVAL_TIME_HOURS = 4;
const NEW_PHONE_APPROVAL_TIME_HOURS = 8;
const OLD_WEB_APPROVAL_TIME_HOURS = 8;
const NEW_WEB_APPROVAL_TIME_HOURS = 16;

export const getUTCDateTime = (
  date: string,
  time: string,
  locale: TableDataItem["customerLocation"]
) => {
  // Split date into month, day, and year
  const [day, month, year] = date.split("/");

  const cleanDay = day.padStart(2, '0');
  const cleanMonth = month.padStart(2, '0');
  const cleanTime = time.padStart(5, '0').padEnd(8, ':00');

  switch (locale) {
    case "US":
      return new Date(`${year}-${cleanDay}-${cleanMonth}T${cleanTime}`);
    case "Europe":
      return new Date(`${year}-${cleanMonth}-${cleanDay}T${cleanTime}`); // Flip 'month' and 'day'
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
};

export const checkIfApproved = (
  isPhone: boolean,
  isOldTos: boolean,
  hoursDiff: number
) => {
  if (isPhone) {
    if (isOldTos) {
      return hoursDiff <= OLD_PHONE_APPROVAL_TIME_HOURS;
    } else {
      return hoursDiff <= NEW_PHONE_APPROVAL_TIME_HOURS;
    }
  } else {
    if (isOldTos) {
      return hoursDiff <= OLD_WEB_APPROVAL_TIME_HOURS;
    } else {
      return hoursDiff <= NEW_WEB_APPROVAL_TIME_HOURS;
    }
  }
};

export const getTimeDifferenceInHours = (date1: Date, date2: Date) => {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  return diffInMs / (1000 * 60 * 60);
};

export const mapDataToFormattedRow = (
  rowData: TableDataItem
): FormattedRowData => {
  const {
    customerLocation,
    rawSignUpDate,
    rawRequestSource,
    rawInvestmentDate,
    rawInvestmentTime,
    rawRefundRequestDate,
    rawRefundRequestTime,
  } = rowData;

  // Get dates and times in UTC
  const signUpUTCDateTime = getUTCDateTime(
    rawSignUpDate,
    rawInvestmentTime,
    customerLocation
  );
  const investmentUTCDateTime = getUTCDateTime(
    rawInvestmentDate,
    rawInvestmentTime,
    customerLocation
  );
  const refundRequestUTCDateTime = getUTCDateTime(
    rawRefundRequestDate,
    rawRefundRequestTime,
    customerLocation
  );

  // Check if the customer is subject to the old tos
  const isOldTos = signUpUTCDateTime < SIGN_UP_DATE_THRESHOLD;
  const isPhone = rawRequestSource === "phone";

  const hoursDiff = getTimeDifferenceInHours(
    investmentUTCDateTime,
    refundRequestUTCDateTime
  );

  const isApproved = checkIfApproved(isPhone, isOldTos, hoursDiff);
  const status = isApproved ? "Approved" : "Denied";

  return {
    ...rowData,
    status,
    signUpUTCDateTime,
    investmentUTCDateTime,
    refundRequestUTCDateTime,
    isOldTos,
  };
};
