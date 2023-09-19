"use client";
import { EditorPopover } from "@/components/EditorPopover";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useStampStore } from "@/hooks/useStore";
import { DotsVerticalIcon, TimerIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
export const StampCard = () => {
    const timestamps = useStampStore((state) => state.timestamps);

    return (
        <Card className="max-w-sm">
            <CardHeader className="">
                <CardTitle className="h-4 flex justify-between items-center">
                    Stamps
                    <EditorPopover />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex max-h-[28rem] gap-3  flex-wrap overflow-scroll ">
                {timestamps.map(({ time, id, label }) => (
                    <Stamp key={id} time={time} label={label ?? ""} />
                ))}
                <Stamp time={0} label={"Starting"} />
                <Stamp time={12100} label={"asfasfs"} />
            </CardContent>
        </Card>
    );
};

const Stamp = ({ time, label }: { time: number; label?: string }) => {
    return (
        <div className="p-2 w-full border-secondary flex items-center gap-4 border shadow-sm rounded-md">
            <Button className="sm:w-24 w-20 text-xs">
                <TimerIcon className="w-4 h-4 mr-2" /> {formatMilliseconds(time)}
            </Button>
            <span className=" text-muted">|</span>
            <span className="text-xs sm:text-sm font-light text-muted-foreground"> {label}</span>
            <div className="ml-auto">
                <StampOptionToggle />
            </div>
        </div>
    );
};

export function StampOptionToggle({}) {
    // const { setTheme } = useTheme();

    // const [editStamp, removeStamp] = useStampStore((state) => [state.editStamp, state.removeStamp]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="" size="icon">
                    <DotsVerticalIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Edit/Delete Option</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("edit")}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("delete")}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function formatMilliseconds(milliseconds: number) {
    // Calculate minutes and seconds
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;
    const seconds = Math.floor(milliseconds / 1000);

    // Format the time as "0:00"
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return formattedTime;
}
