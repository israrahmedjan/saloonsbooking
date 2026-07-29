import { createClient } from '@supabase/supabase-js'
import { format } from "date-fns";
import { slotsType } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase environment variables are missing")
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)

export function getTotalMinutes(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  return endTotalMinutes - startTotalMinutes;
}

export const formatTime = (time: string) => {
  const date = new Date(`2000-01-01T${time}`);
  return format(date, "hh:mm a");
};


