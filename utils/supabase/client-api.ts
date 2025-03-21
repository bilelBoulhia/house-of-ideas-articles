import {createClient} from "@/utils/supabase/client";


const supabaseClient = createClient();

export async function fetch<T>(
    table: string,

    columns: string[] = ['*'],
    SecondaryQuery?: (query: any) => any
): Promise<T[]> {
    try {
        let query = supabaseClient.from(table).select(columns.join(', '));

        const {data, error} = SecondaryQuery ? await SecondaryQuery(query) : await query;

        if (error) {
           new Error(error.message);
        }

        return data as T[];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function insert<T>(
    table: string,
    data: Partial<T> | Partial<T>[] | null
): Promise<boolean> {
    try {
        const {error} = await supabaseClient
            .from(table)
            .insert(data);

        return !error; // Returns true if there's no error, false otherwise
    } catch (error) {
        console.error('Error inserting data:', error);
        return false;
    }
}

export async function proc(
    fn: string,
    params?: Record<string, any>,
    SecondaryQuery?: (query: any) => any,
) {

    const supabaseClient = createClient();
    let query = supabaseClient.rpc(fn, params)
    return SecondaryQuery ? await SecondaryQuery(query) : await query;

}