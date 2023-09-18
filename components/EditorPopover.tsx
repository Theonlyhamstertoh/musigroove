import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PlusIcon } from "@radix-ui/react-icons";

export function EditorPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="">
                    <PlusIcon className="mr-1 h-5 w-5" />
                    Add Stamp
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="timestamp">Time</Label>
                            <Input id="timestamp" defaultValue="100%" className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="label">Label</Label>
                            <Input id="label" defaultValue="300px" className="col-span-2 h-8" />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
