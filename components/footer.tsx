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
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Partner with us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Ride with us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Refund & Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section with improved styling */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">FOLLOW US</h3>
            <div className="flex space-x-4 mb-8">
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-2 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-2 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-2 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>

            <p className="text-sm text-gray-300 mb-6 font-medium">Receive exclusive offers in your mailbox</p>

            <form onSubmit={handleSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input bg-gray-800 dark:bg-gray-900 border-gray-700 dark:border-gray-800 text-white placeholder-gray-400 focus:border-primary-500 h-12"
                required
              />
              <Button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 h-12 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-medium">All rights Reserved © Your Company, 2021</p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0 font-medium">Made with ❤️ by Themewagon</p>
        </div>
      </div>
    </footer>
  )
}
