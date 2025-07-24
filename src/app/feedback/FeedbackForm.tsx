"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Send, MessageSquare } from "lucide-react"
import Image from "next/image"
import {ChatMessageLogo} from "@/app/ChatMessage";
import {useTranslations} from "@/app/languages/useTranslations";

interface FeedbackFormProps {
    onClose?: () => void
}

export function FeedbackForm({ onClose }: FeedbackFormProps) {
    const translations = useTranslations();
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleStarClick = (starRating: number) => {
        setRating(starRating)
        setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (rating === 0) {
            setError("Bitte gib eine Bewertung ab")
            return
        }

        if (!message.trim()) {
            setError("Bitte schreib eine Nachricht")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            const response = await fetch("/feedback/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating,
                    message: message.trim(),
                    name: name.trim() || undefined,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Fehler beim Senden")
            }

            setIsSubmitted(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <Card className="w-full max-w-md mx-auto border-2 border-red-500 shadow-lg overflow-hidden">
                <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ChatMessageLogo role="assistant" size="w-14 h-14" outerSize="h-18 w-18" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{translations.feedback.thanks.title} 🦁</h3>
                    <p className="text-gray-600 mb-4">
                        {translations.feedback.thanks.message}
                    </p>
                    {onClose && (
                        <Button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white">
                            {translations.close}
                        </Button>
                    )}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto border-2 border-red-500  shadow-lg !p-0 overflow-hidden">
            <CardHeader className="bg-red-500 text-white">
                <CardTitle className="flex items-center gap-3 !py-4 rounded-t-lg">
                    <MessageSquare className="w-6 h-6" />
                    {translations.feedback.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Leo Avatar */}
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                            <ChatMessageLogo role="assistant" size="w-14 h-14" outerSize="h-18 w-18" />
                        </div>
                        <p className="text-sm text-gray-600"> {translations.feedback.description}</p>
                    </div>

                    {/* Star Rating */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700"> {translations.feedback.rating} *</label>
                        <div className="flex justify-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleStarClick(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="p-1 transition-transform hover:scale-110 cursor-pointer"
                                >
                                    <Star
                                        className={`w-8 h-8 ${
                                            star <= (hoveredRating || rating) ? "fill-red-500 text-red-500" : "text-gray-300"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="text-center text-sm text-gray-600">
                                {rating === 1 && "Sehr schlecht"}
                                {rating === 2 && "Schlecht"}
                                {rating === 3 && "Okay"}
                                {rating === 4 && "Gut"}
                                {rating === 5 && "Ausgezeichnet"}
                            </p>
                        )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                            {translations.feedback.message} *
                        </label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={translations.feedback.messagePlaceholder}
                            className="border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 min-h-[100px]"
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500 text-right">{message.length}/500 {translations.feedback.characters}</p>
                    </div>

                    {/* Optional Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            {translations.feedback.name} ({translations.feedback.optional})
                        </label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={translations.feedback.namePlaceholder}
                            className="border-2 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            maxLength={50}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                {translations.feedback.sending}...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Send className="w-5 h-5" />
                                {translations.feedback.send}
                            </div>
                        )}
                    </Button>

                    {/* Close Button */}
                    {onClose && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="w-full border-2 border-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                        >
                            {translations.cancel}
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}
