"use client";

import { Book } from '@/components/ui/book';
import type { JSX } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SupportPage(): JSX.Element {
  return (
    <section className="bg-sand-100 min-h-screen py-16 md:py-24">
      <div className="container max-w-3xl space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Helloooo! How can we help you?
          </h1>
          <p className="text-muted-foreground text-lg">
            Whether you found a bug, have feedback, or just want to say hi, we are all ears.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-background/80 rounded-2xl p-6 sm:p-10 shadow-sm border">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@company.com"
                autoComplete="email"
                spellCheck={false}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Message Type</Label>
              <Select name="type" required defaultValue="feedback">
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Report a Bug</SelectItem>
                  <SelectItem value="feedback">Product Feedback</SelectItem>
                  <SelectItem value="question">General Question</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us what's on your mind…"
                rows={5}
                required
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </div>

        {/* Reference Links / Cards via Book component */}
        <div className="space-y-6 pt-12 mt-12 border-t border-border/50">
          <h2 className="text-2xl font-semibold text-left lg:text-center">Helpful Resources</h2>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm overflow-hidden flex flex-col sm:flex-row gap-6 items-start justify-start">
            <a href="/docs/getting-started" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg transition-transform hover:-translate-y-1 mt-4 sm:mt-0">
              <Book title="Getting Started Guide" />
            </a>
            <a href="/faq" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg transition-transform hover:-translate-y-1">
              <Book title="Frequently Asked Questions" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
