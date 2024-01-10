import { z } from "zod";
import { mapDataToFormattedRow } from "../utils/mapData";

// Schema & Types
export type TableDataItem = z.infer<typeof tableDataItemSchema>;

export const tableDataItemSchema = z.object({
  name: z.string(),
  customerLocation: z.union([z.literal("US"), z.literal("Europe")]),
  rawSignUpDate: z.string(),
  rawRequestSource: z.union([z.literal("phone"), z.literal("web app")]),
  rawInvestmentDate: z.string(),
  rawInvestmentTime: z.string(),
  rawRefundRequestDate: z.string(),
  rawRefundRequestTime: z.string(),
});

// Data (ideally this data would be formatted properly, correct locales, UTC dateTimes etc)
export const TABLE_ROWS: TableDataItem[] = [
  {
    name: "Emma Smith",
    customerLocation: "US",
    rawSignUpDate: "1/2/2020",
    rawRequestSource: "phone",
    rawInvestmentDate: "1/2/2021",
    rawInvestmentTime: "06:00",
    rawRefundRequestDate: "1/2/2021",
    rawRefundRequestTime: "09:00",
  },
  {
    name: "Benjamin Johnson",
    customerLocation: "Europe",
    rawSignUpDate: "12/2/2020",
    rawRequestSource: "web app",
    rawInvestmentDate: "2/1/2021",
    rawInvestmentTime: "06:30",
    rawRefundRequestDate: "1/2/2021",
    rawRefundRequestTime: "23:00",
  },
  {
    name: "Olivia Davis",
    customerLocation: "Europe",
    rawSignUpDate: "1/2/2020",
    rawRequestSource: "web app",
    rawInvestmentDate: "2/2/2021",
    rawInvestmentTime: "13:00",
    rawRefundRequestDate: "2/2/2021",
    rawRefundRequestTime: "20:00",
  },
  {
    name: "Ethan Anderson",
    customerLocation: "US",
    rawSignUpDate: "1/11/2011",
    rawRequestSource: "web app",
    rawInvestmentDate: "2/1/2021",
    rawInvestmentTime: "13:00",
    rawRefundRequestDate: "2/2/2021",
    rawRefundRequestTime: "16:00",
  },
  {
    name: "Sophia Wilson",
    customerLocation: "US",
    rawSignUpDate: "2/1/2020",
    rawRequestSource: "phone",
    rawInvestmentDate: "2/1/2021",
    rawInvestmentTime: "22:00",
    rawRefundRequestDate: "2/2/2021",
    rawRefundRequestTime: "5:00",
  },
  {
    name: "Liam Martinez",
    customerLocation: "Europe",
    rawSignUpDate: "1/1/2020",
    rawRequestSource: "web app",
    rawInvestmentDate: "1/1/2021",
    rawInvestmentTime: "11:00",
    rawRefundRequestDate: "11/1/2021",
    rawRefundRequestTime: "12:00",
  },
] as const;

export const mappedData = TABLE_ROWS.map((row) => mapDataToFormattedRow(tableDataItemSchema.parse(row)));
