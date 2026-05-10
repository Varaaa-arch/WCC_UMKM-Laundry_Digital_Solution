"use client";

import { ShieldCheckIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";
import { confirmBooking } from "@/actions/booking-action";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SERVICE_LABEL: Record<string, string> = {};
