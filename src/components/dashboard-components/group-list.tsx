import { useGetGroup } from "@/hooks/groups-hook"
import { Card, CardContent, CardHeader } from "../ui/card"
import { SkeletonCard } from "../skeleton";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Plus } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";
import { motion, Variants } from "framer-motion";



const gridVariant: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export const GroupList = () => {
    const { data: GroupList = [], isLoading } = useGetGroup();

    if (isLoading) {
        return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }
    return (
        <motion.section
            variants={gridVariant}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
        >            
            {GroupList.map((list) => (
                <motion.div key={list.id} variants={cardVariant}>
                    <Link href={`/groups/${list.id}`} >
                        <Card className="relative group shadow-soft transition">
                            <Image
                                src={list.cover_image_url ?? "/bg-cover.jpg"}
                                alt="community-image"
                                width={200}
                                height={100}
                                className="w-full h-30 object-cover transition duration-300 group-hover:scale-105"
                            />
                            {list.tags.length > 0 && (
                                    <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5">
                                        {list.tags.slice(0, 1).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            <CardHeader className="">
                                <h2 className="text-lg font-semibold font-bricolage">
                                    {list.name}
                                </h2>
                                <p className="text-muted-foreground truncate line-clamp-1 group-hover:text-primary">{list.description}</p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center flex-wrap gap-3">
                                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {list.total_attendee_count ?? 0} members</span>
                                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {list.total_session_count ?? 0} sessions</span>
                                </div>
                                <p className="text-muted-foreground text-xs">Created {formatRelativeTime(list.created_at)}</p>
                            </CardContent>
                            
                        </Card>
                    </Link>
                </motion.div>
            ))}
            {/* <motion.div variants={cardVariant}> */}
                <Card className="border-2 border-dashed ring-0 bg-background shadow-soft items-center justify-center py-6">
                    <div className="bg-muted text-muted-foreground w-10 h-10 rounded-full flex items-center justify-center">
                        <Plus className="w-5 h-5"/>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold font-bricolage">Start a new group</h3>
                        <p className="text-muted-foreground">
                            Create a home for a new meetup series
                        </p>
                    </div>
                    <Link href="/groups/new"
                        className="inline-flex w-full items-center justify-center gap-1 rounded-full text-primary-foreground bg-primary px-4 py-2 shadow-lift transition hover:brightness-105 sm:w-auto"
                    >
                        <Plus className="w-5 h-5"/>New group
                    </Link>

                </Card>
            {/* </motion.div> */}
        </motion.section>
    )
}