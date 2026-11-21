// Mirrors the output of `pnpm db:types`; regenerate instead of editing once the schema is live.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: Database["public"]["Enums"]["user_role"];
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          created_at?: string;
        };
        Relationships: [];
      };
      laptop_models: {
        Row: {
          id: string;
          slug: string;
          name: string;
          brand: string;
          release_year: number | null;
          model_url: string | null;
          thumbnail_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          brand: string;
          release_year?: number | null;
          model_url?: string | null;
          thumbnail_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          brand?: string;
          release_year?: number | null;
          model_url?: string | null;
          thumbnail_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      laptop_components: {
        Row: {
          id: string;
          model_id: string;
          module_type: Database["public"]["Enums"]["module_type"];
          name: string;
          mesh_name: string;
          explode_direction: number[];
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          model_id: string;
          module_type: Database["public"]["Enums"]["module_type"];
          name: string;
          mesh_name: string;
          explode_direction?: number[];
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          model_id?: string;
          module_type?: Database["public"]["Enums"]["module_type"];
          name?: string;
          mesh_name?: string;
          explode_direction?: number[];
          description?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "laptop_components_model_id_fkey";
            columns: ["model_id"];
            isOneToOne: false;
            referencedRelation: "laptop_models";
            referencedColumns: ["id"];
          },
        ];
      };
      diagnostic_issues: {
        Row: {
          id: string;
          module_type: Database["public"]["Enums"]["module_type"];
          title: string;
          symptoms: string[];
          description: string | null;
          severity: Database["public"]["Enums"]["issue_severity"];
          estimated_cost_min: number;
          estimated_cost_max: number;
          estimated_duration_minutes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          module_type: Database["public"]["Enums"]["module_type"];
          title: string;
          symptoms?: string[];
          description?: string | null;
          severity?: Database["public"]["Enums"]["issue_severity"];
          estimated_cost_min: number;
          estimated_cost_max: number;
          estimated_duration_minutes?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          module_type?: Database["public"]["Enums"]["module_type"];
          title?: string;
          symptoms?: string[];
          description?: string | null;
          severity?: Database["public"]["Enums"]["issue_severity"];
          estimated_cost_min?: number;
          estimated_cost_max?: number;
          estimated_duration_minutes?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      spare_parts: {
        Row: {
          id: string;
          model_id: string | null;
          module_type: Database["public"]["Enums"]["module_type"];
          sku: string;
          name: string;
          description: string | null;
          price: number;
          stock: number;
          image_url: string | null;
          model_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          model_id?: string | null;
          module_type: Database["public"]["Enums"]["module_type"];
          sku: string;
          name: string;
          description?: string | null;
          price: number;
          stock?: number;
          image_url?: string | null;
          model_url?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          model_id?: string | null;
          module_type?: Database["public"]["Enums"]["module_type"];
          sku?: string;
          name?: string;
          description?: string | null;
          price?: number;
          stock?: number;
          image_url?: string | null;
          model_url?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "spare_parts_model_id_fkey";
            columns: ["model_id"];
            isOneToOne: false;
            referencedRelation: "laptop_models";
            referencedColumns: ["id"];
          },
        ];
      };
      service_bookings: {
        Row: {
          id: string;
          user_id: string;
          model_id: string;
          technician_id: string | null;
          status: Database["public"]["Enums"]["booking_status"];
          service_type: Database["public"]["Enums"]["service_type"];
          scheduled_at: string;
          address: string | null;
          notes: string | null;
          diagnosis: Json;
          estimated_cost: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          model_id: string;
          technician_id?: string | null;
          status?: Database["public"]["Enums"]["booking_status"];
          service_type: Database["public"]["Enums"]["service_type"];
          scheduled_at: string;
          address?: string | null;
          notes?: string | null;
          diagnosis?: Json;
          estimated_cost?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          model_id?: string;
          technician_id?: string | null;
          status?: Database["public"]["Enums"]["booking_status"];
          service_type?: Database["public"]["Enums"]["service_type"];
          scheduled_at?: string;
          address?: string | null;
          notes?: string | null;
          diagnosis?: Json;
          estimated_cost?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "service_bookings_model_id_fkey";
            columns: ["model_id"];
            isOneToOne: false;
            referencedRelation: "laptop_models";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "service_bookings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "service_bookings_technician_id_fkey";
            columns: ["technician_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: Database["public"]["Enums"]["order_status"];
          total_amount: number;
          shipping_address: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: Database["public"]["Enums"]["order_status"];
          total_amount: number;
          shipping_address: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: Database["public"]["Enums"]["order_status"];
          total_amount?: number;
          shipping_address?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          spare_part_id: string;
          quantity: number;
          unit_price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          spare_part_id: string;
          quantity: number;
          unit_price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          spare_part_id?: string;
          quantity?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_spare_part_id_fkey";
            columns: ["spare_part_id"];
            isOneToOne: false;
            referencedRelation: "spare_parts";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      place_order: {
        Args: { items: Json; shipping_address: string };
        Returns: string;
      };
    };
    Enums: {
      user_role: "customer" | "technician" | "admin";
      module_type:
        | "battery"
        | "fan"
        | "ram"
        | "ssd"
        | "keyboard"
        | "screen"
        | "motherboard"
        | "expansion_card";
      issue_severity: "low" | "medium" | "high" | "critical";
      service_type: "drop_off" | "home_service";
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled";
      order_status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];

export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];

export type Enums<T extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][T];
