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
import { DotsVerticalIcon, LoopIcon, TimerIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { formatTime } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import Marquee from "react-fast-marquee";
import { Toggle } from "./ui/toggle";
export const StampCard = ({
    jumpTo,
    elapsed,
    end,
    getCurrentTime,
}: {
    jumpTo: (timestamp: number) => void;
    elapsed: number;
    end: number;
    getCurrentTime: () => void;
}) => {
    const timestamps = useStampStore((state) => state.timestamps);

    return (
        <Card className="max-w-sm w-full">
            <CardHeader className="">
                <CardTitle className="h-4 flex justify-between items-center">
                    Stamps
                    <EditorPopover end={end} elapsed={elapsed} getCurrentTime={getCurrentTime} />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex max-h-[28rem] gap-3  flex-wrap overflow-scroll ">
                {timestamps
                    .sort((a, b) => a.time - b.time)
                    .map(({ time, id, label }) => (
                        <Stamp jumpTo={jumpTo} key={id} id={id} time={time} label={label ?? ""} />
                    ))}

                {/* <St?amp time={0} label={"Starting"} jumpTo={jumpTo} /> */}
                {/* <Sta?mp time={121} label={"asfasfs"} jumpTo={jumpTo} /> */}
            </CardContent>
        </Card>
    );
};

const Stamp = ({
    time,
    label,
    id,
    jumpTo,
}: {
    time: number;
    id: string;
    label?: string;
    jumpTo: any;
}) => {
    return (
        <div className="p-2 w-full border-secondary flex items-center gap-1 sm:gap-4 border shadow-sm rounded-md">
            <Button
                className="sm:w-24  flex gap-2 shrink-0 w-20 text-xs"
                onClick={() => jumpTo(time)}
            >
                <TimerIcon className="w-4 h-4 " /> {formatTime(time)}
            </Button>
            <span className=" text-muted">|</span>
            {/* <div className="span lg:hidden">
                <Marquee
                    speed={50}
                    className="overflow-x-scroll text-xs sm:text-sm font-light text-muted-foreground"
                >
                    {label} aslfkja sfl alfkajsfl af als fal fal
                </Marquee>
            </div> */}
            <span className="overflow-x-scroll  text-xs font-light text-muted-foreground">
                {label}
            </span>
            <div className="ml-auto space-x-1 flex ">
                {/* <Toggle onClick={} className=""> */}
                {/* <LoopIcon /> */}
                {/* </Toggle> */}
                <StampOptionToggle id={id} />
            </div>
        </div>
    );
};

export function StampOptionToggle({ id }: { id: string }) {
    // const { setTheme } = useTheme();

    const [removeStamp] = useStampStore((state) => [state.removeStamp]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="" size="icon">
                    <DotsVerticalIcon className="scale-125 rotate-0 transition-all" />
                    <span className="sr-only">Edit/Delete Option</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {/* <DropdownMenuItem onClick={() => console.log("edit")}>Edit</DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => removeStamp(id)}>Delete</DropdownMenuItem>
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
