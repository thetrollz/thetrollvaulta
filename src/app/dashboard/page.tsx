import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FileText, Lock, ShieldAlert } from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";

const chartData = [
  { strength: "Weak", passwords: 186, fill: "hsl(var(--destructive))" },
  { strength: "Fair", passwords: 305, fill: "hsl(var(--primary))" },
  { strength: "Good", passwords: 237, fill: "hsl(var(--primary))" },
  { strength: "Strong", passwords: 73, fill: "hsl(var(--primary))" },
  { strength: "Excellent", passwords: 209, fill: "hsl(var(--primary))" },
];

const chartConfig = {
  passwords: {
    label: "Passwords",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Passwords
            </CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-code text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Secure Notes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-code text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+19 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Breach Alerts
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="font-code text-2xl font-bold text-destructive">
              12
            </div>
            <p className="text-xs text-muted-foreground">
              Action recommended
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Strength
            </CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Good</div>
            <p className="text-xs text-muted-foreground">
              85% of passwords are strong
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Password Strength</CardTitle>
          <CardDescription>
            A distribution of your passwords by strength.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="strength"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="passwords" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="text-muted-foreground">
            Increase your security by updating weak passwords.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
