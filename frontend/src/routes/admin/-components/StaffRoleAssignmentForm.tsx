import { useState, useEffect, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Loader2, X } from "lucide-react";
import { ALL_ROLES } from "@repo/types";
import type { UserWithRolesDTO } from "@repo/contracts";
import { cn } from "@/utils/cn";
import { useUserSearch, useUpdateUserRoles } from "@/lib/api/user.queries";

const SEARCH_DEBOUNCE_MS = 280;

function staffRoleNamesFromUser(user: UserWithRolesDTO): Set<string> {
    const staff = ALL_ROLES as readonly string[];
    const names = new Set<string>();
    for (const ur of user.userRoles) {
        const n = ur.role.name;
        if (staff.includes(n)) {
            names.add(n);
        }
    }
    return names;
}

export default function StaffRoleAssignmentForm() {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserWithRolesDTO | null>(
        null,
    );
    const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
    const suppressPopoverOpenRef = useRef(false);

    useEffect(() => {
        const t = window.setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, SEARCH_DEBOUNCE_MS);
        return () => window.clearTimeout(t);
    }, [searchInput]);

    const { data: searchResults, isFetching } = useUserSearch(debouncedSearch);
    const updateRoles = useUpdateUserRoles();

    const pickUser = (user: UserWithRolesDTO) => {
        updateRoles.reset();
        suppressPopoverOpenRef.current = true;
        setOpen(false);
        setSelectedUser(user);
        setSelectedRoles(staffRoleNamesFromUser(user));
        setSearchInput(user.name);
        setDebouncedSearch(user.name);
        window.setTimeout(() => {
            suppressPopoverOpenRef.current = false;
        }, 200);
    };

    const openPopoverFromInput = () => {
        if (suppressPopoverOpenRef.current) {
            return;
        }
        setOpen(true);
    };

    const clearSelection = () => {
        setSelectedUser(null);
        setSelectedRoles(new Set());
        setSearchInput("");
        setDebouncedSearch("");
        setOpen(false);
        updateRoles.reset();
    };

    const toggleRole = (roleName: string) => {
        setSelectedRoles((prev) => {
            const next = new Set(prev);
            if (next.has(roleName)) {
                next.delete(roleName);
            } else {
                next.add(roleName);
            }
            return next;
        });
    };

    const handleSave = () => {
        if (!selectedUser) {
            return;
        }
        updateRoles.mutate(
            {
                userId: selectedUser.id,
                roles: Array.from(selectedRoles),
            },
            {
                onSuccess: (data) => {
                    setSelectedUser(data);
                    setSelectedRoles(staffRoleNamesFromUser(data));
                    setSearchInput(data.name);
                },
            },
        );
    };

    return (
        <div className="bg-firstBg border-border mb-8 rounded-xl border p-4">
            <h3 className="text-textPrimary mb-3 text-lg font-semibold">
                Manage roles
            </h3>
            <div className="flex min-w-0 flex-nowrap items-center gap-3 overflow-x-auto">
            <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Anchor asChild>
                    <input
                        type="search"
                        autoComplete="off"
                        placeholder="Search user…"
                        value={searchInput}
                        onChange={(e) => {
                            const v = e.target.value;
                            setSearchInput(v);
                            setOpen(true);
                            if (
                                selectedUser &&
                                v !== selectedUser.name
                            ) {
                                updateRoles.reset();
                                setSelectedUser(null);
                                setSelectedRoles(new Set());
                            }
                        }}
                        onFocus={(e) => {
                            openPopoverFromInput();
                            if (
                                selectedUser &&
                                e.currentTarget.value === selectedUser.name
                            ) {
                                e.currentTarget.select();
                            }
                        }}
                        onClick={openPopoverFromInput}
                        className="border-border bg-secondBg text-textPrimary placeholder:text-textSecondary/60 focus:border-cfRed/50 h-8 w-44 shrink-0 rounded-md border px-2 text-sm outline-none"
                    />
                </Popover.Anchor>
                <Popover.Portal>
                    <Popover.Content
                        align="start"
                        sideOffset={6}
                        collisionPadding={12}
                        className={cn(
                            "border-border bg-firstBg z-50 w-44 rounded-md border shadow-xl",
                        )}
                        onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                        <div className="max-h-52 overflow-y-auto py-1">
                            {debouncedSearch.trim().length < 2 && (
                                <p className="text-textSecondary px-3 py-2 text-xs">
                                    Type at least 2 characters.
                                </p>
                            )}
                            {debouncedSearch.trim().length >= 2 &&
                                isFetching && (
                                    <div className="text-textSecondary flex items-center gap-2 px-3 py-2 text-xs">
                                        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
                                        Searching…
                                    </div>
                                )}
                            {debouncedSearch.trim().length >= 2 &&
                                !isFetching &&
                                searchResults &&
                                searchResults.length === 0 && (
                                    <p className="text-textSecondary px-3 py-2 text-xs">
                                        No users found.
                                    </p>
                                )}
                            {debouncedSearch.trim().length >= 2 &&
                                !isFetching &&
                                searchResults &&
                                searchResults.length > 0 && (
                                    <ul>
                                        {searchResults.map((u) => (
                                            <li key={u.id}>
                                                <button
                                                    type="button"
                                                    onPointerDown={(e) =>
                                                        e.preventDefault()
                                                    }
                                                    onClick={() => pickUser(u)}
                                                    className="hover:bg-cfRed/10 w-full px-3 py-2 text-left text-sm transition-colors"
                                                >
                                                    <span className="text-textPrimary block truncate font-medium">
                                                        {u.name}
                                                    </span>
                                                    <span className="text-textSecondary/80 block truncate text-xs">
                                                        {u.email}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
            {selectedUser && (
                <>
                    <fieldset
                        key={selectedUser.id}
                        className="flex shrink-0 items-center gap-3 border-0 p-0"
                    >
                        {ALL_ROLES.map((roleName) => (
                            <label
                                key={roleName}
                                className="flex cursor-pointer items-center gap-1.5 text-xs whitespace-nowrap"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedRoles.has(roleName)}
                                    onChange={() => toggleRole(roleName)}
                                    className="border-border accent-cfRed h-3.5 w-3.5 rounded"
                                />
                                <span className="text-textPrimary">
                                    {roleName.replace(/_/g, " ")}
                                </span>
                            </label>
                        ))}
                    </fieldset>
                    <button
                        type="button"
                        onClick={clearSelection}
                        title="Clear selection"
                        className="text-textSecondary hover:text-cfRed hover:bg-cfRed/10 flex h-8 shrink-0 items-center gap-1 rounded-md px-2 text-xs font-medium"
                    >
                        <X className="h-4 w-4" />
                        Clear
                    </button>
                    <button
                        type="button"
                        disabled={updateRoles.isPending}
                        onClick={handleSave}
                        className="bg-cfRed hover:bg-cfRed/90 disabled:bg-textSecondary/30 ml-auto h-8 shrink-0 rounded-md px-3 text-xs font-semibold text-white disabled:cursor-not-allowed"
                    >
                        {updateRoles.isPending ? "Saving…" : "Save"}
                    </button>
                    {updateRoles.isError && (
                        <span className="text-cfRed shrink-0 text-xs">
                            Save failed.
                        </span>
                    )}
                </>
            )}
            </div>
        </div>
    );
}
