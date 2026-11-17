import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-3">
        <Skeleton className="h-20" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  )
}
