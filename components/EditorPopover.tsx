import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PlusIcon, TargetIcon, TimerIcon } from "@radix-ui/react-icons";
import { Slider } from "./ui/slider";
import { formatTime } from "@/lib/utils";
import { useStampStore } from "@/hooks/useStore";
import { useEffect, useMemo, useRef, useState } from "react";

export function EditorPopover({ elapsed, end, getCurrentTime }: any) {
    const [addStamp, handleOpenPopover, openPopover] = useStampStore((state) => [
        state.addStamp,
        state.handleOpenPopover,
        state.openPopover,
    ]);
    const [stopTime, setStopTime] = useState(0);
    const [newTime, setNewTime] = useState(0);
    const [label, setLabel] = useState("");

    useEffect(() => {
        console.log(openPopover);
        setNewTime(elapsed);
    }, [openPopover]);
    const timeRef = useRef();
    return (
        <Popover open={openPopover} onOpenChange={handleOpenPopover}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="">
                    <PlusIcon className="mr-1 h-5 w-5" />
                    Add Stamp
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[22rem]">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex justify-start items-center gap-4">
                            <Label htmlFor="timestamp">Time</Label>
                            <Slider
                                id="timestamp"
                                max={end}
                                defaultValue={[newTime]}
                                className="grow"
                                onValueChange={(value) => setNewTime(value[0]!)}
                            />
                            <span id="timestamp" defaultValue="" className="w-16">
                                {formatTime(newTime)}
                            </span>
                        </div>
                        <div className="flex justify-start items-center gap-4">
                            <Label htmlFor="label">Label</Label>
                            <Input
                                id="label"
                                // defaultValue="Starting beat..."
                                placeholder="Ex. Starting beat"
                                className="col-span-2 h-8"
                                onInput={(e) => setLabel(e.currentTarget.value)}
                            />
                        </div>
                        <Button
                            onClick={() => {
                                addStamp(newTime, label);
                                handleOpenPopover();
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
