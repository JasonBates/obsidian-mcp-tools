/**
 * Tool group definitions for DISABLED_TOOLS environment variable.
 * Use group names (e.g., "@active-file") to disable multiple tools at once.
 */
export const TOOL_GROUPS: Record<string, string[]> = {
  "@active-file": [
    "get_active_file",
    "update_active_file",
    "append_to_active_file",
    "patch_active_file",
    "delete_active_file",
  ],
  "@vault-file": [
    "get_vault_file",
    "get_vault_files",
    "create_vault_file",
    "append_to_vault_file",
    "patch_vault_file",
    "delete_vault_file",
  ],
  "@write": [
    "update_active_file",
    "append_to_active_file",
    "patch_active_file",
    "delete_active_file",
    "create_vault_file",
    "append_to_vault_file",
    "patch_vault_file",
    "delete_vault_file",
  ],
  "@search": ["search_vault", "search_vault_simple", "search_vault_smart"],
};

/**
 * Expand tool names, replacing group shortcuts with their member tools.
 * @param names - Array of tool names or group shortcuts (e.g., ["@active-file", "fetch"])
 * @returns Array of individual tool names
 */
export function expandToolNames(names: string[]): string[] {
  const result = new Set<string>();
  for (const name of names) {
    if (name.startsWith("@") && TOOL_GROUPS[name]) {
      for (const tool of TOOL_GROUPS[name]) {
        result.add(tool);
      }
    } else {
      result.add(name);
    }
  }
  return Array.from(result);
}
