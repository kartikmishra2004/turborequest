import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {
    setDialogOpen: (params: boolean) => void;
}

const Wellcome: React.FC<Props> = ({ setDialogOpen }) => {
    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-background to-zinc-900" />

            <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                <div className="space-y-6">
                    <h1 className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        Start organizing your requests
                    </h1>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Create a new collection to group your API requests, examples, and documentation in one place.
                    </p>

                    <div className="pt-4 space-x-5">
                        <Button
                            onClick={() => setDialogOpen(true)}
                            size="lg"
                            className=""
                        >
                            <span className="flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                <span>Create Collection</span>
                            </span>
                            <div className="absolute inset-0 pointer-events-none glass-morphism opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                        <Button
                            size="lg"
                            variant='outline'
                            className=""
                            onClick={() => console.log("Create collection clicked")}
                        >
                            <span className="flex items-center gap-2">
                                <span>New request</span>
                            </span>
                            <div className="absolute inset-0 pointer-events-none glass-morphism opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-zinc-800/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-zinc-800/20 to-transparent rounded-full blur-3xl" />
            </div>
        </div>
    )
}

export default Wellcome