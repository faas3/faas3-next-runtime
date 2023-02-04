import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = "https://picwqygjdjkgpkoivdxn.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY3dxeWdqZGprZ3Brb2l2ZHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1ODc2NTcsImV4cCI6MTk4MjE2MzY1N30.LlVa9L-n1b7PSVszZRzH8W5_SIaQb6qI5Xy7e16NN6g";
const table = "onchain_functions";

class Database {
  #cli: SupabaseClient;

  constructor() {
    this.#cli = createClient(url, key);
  }

  async findByName(name: string): Promise<any> {
    const { data } = await this.#cli
      .from("move_functions")
      .select("*")
      .eq("name", name);
    return data;
  }
}

export const db = new Database();
