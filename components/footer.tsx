"use client"

import type React from "react"

import { useState } from "react"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribe email:", email)
    setEmail("")
  }

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Company Section */}
          <div>
            <h3 className="text-base font-bold mb-3 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-base font-bold mb-3 text-white">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Partner with us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Ride with us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-base font-bold mb-3 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Refund & Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-xs">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section with improved styling */}
          <div>
            <h3 className="text-base font-bold mb-3 text-white">FOLLOW US</h3>
            <div className="flex space-x-2 mb-4">
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-1 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-1 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-1 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-gray-300 mb-3 font-medium">Receive exclusive offers in your mailbox</p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input bg-gray-800 dark:bg-gray-900 border-gray-700 dark:border-gray-800 text-white placeholder-gray-400 focus:border-primary-500 h-9 text-xs"
                required
              />
              <Button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 h-9 font-medium shadow-lg hover:shadow-xl transition-all text-xs"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs font-medium">All rights Reserved © Your Company, 2021</p>
          <p className="text-gray-400 text-xs mt-1 sm:mt-0 font-medium">Made with ❤️ by Themewagon</p>
        </div>
      </div>
    </footer>
  )
}
