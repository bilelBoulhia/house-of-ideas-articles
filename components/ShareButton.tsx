"use client"

import { useState } from "react"
import { Share2, Copy, Check, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import {FacebookIcon} from "@/components/ui/Icons";
import {BiLogoTwitter} from "react-icons/bi";
import {LinkedInLogoIcon} from "@radix-ui/react-icons";

interface ShareButtonsProps {
    className?: string
    link: string
    title?: string
}

export default function ShareButtons({ link, title = "Check this out!", className }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + link)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(title)}`,
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(link)
            setCopied(true)

            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.log(err)
        }
    }

    const openShareUrl = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={cn("border-gray-600", className)}>
                    <Share2 className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => openShareUrl(shareUrls.facebook)}>
                    <FacebookIcon className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openShareUrl(shareUrls.twitter)}>
                    <BiLogoTwitter className="h-4 w-4 mr-2 text-sky-500" />
                    <span>Twitter</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openShareUrl(shareUrls.linkedin)}>
                    <LinkedInLogoIcon className="h-4 w-4 mr-2 text-blue-700" />
                    <span>LinkedIn</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openShareUrl(shareUrls.whatsapp)}>
                    <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openShareUrl(shareUrls.telegram)}>
                    <Send className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Telegram</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyLink}>
                    {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                    <span>Copy link</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

