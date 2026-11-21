import type { Enums, Tables } from "@/types/database";

export type UserRole = Enums<"user_role">;
export type ModuleType = Enums<"module_type">;
export type IssueSeverity = Enums<"issue_severity">;
export type ServiceType = Enums<"service_type">;
export type BookingStatus = Enums<"booking_status">;
export type OrderStatus = Enums<"order_status">;

export type Profile = Tables<"profiles">;
export type LaptopModel = Tables<"laptop_models">;
export type LaptopComponent = Tables<"laptop_components">;
export type DiagnosticIssue = Tables<"diagnostic_issues">;
export type SparePart = Tables<"spare_parts">;
export type ServiceBooking = Tables<"service_bookings">;
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;

export type LaptopModelWithComponents = LaptopModel & {
  laptop_components: LaptopComponent[];
};

export type OrderWithItems = Order & {
  order_items: (OrderItem & { spare_parts: SparePart })[];
};

/** One issue the user confirmed while inspecting a module in the 3D viewer. */
export type DiagnosisFinding = {
  moduleType: ModuleType;
  issueId: string;
};

/** Shape stored in service_bookings.diagnosis so the technician sees what the user found. */
export type DiagnosisSnapshot = {
  modelId: string;
  findings: DiagnosisFinding[];
  estimatedCostMin: number;
  estimatedCostMax: number;
};

export type SparePartWithModel = SparePart & {
  laptop_models: Pick<LaptopModel, "name" | "slug"> | null;
};
