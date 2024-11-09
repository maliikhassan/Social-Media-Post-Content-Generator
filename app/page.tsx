'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy } from 'lucide-react'

export default function SocialMediaPostGenerator() {
  const [platform, setPlatform] = useState('')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('')
  const [specialInstruction, setSpecialInstruction] = useState('')
  const [generatedPost, setGeneratedPost] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleGenerate = async () => {
    setIsLoading(true)
    setAlert(null)
    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform, topic, tone, specialInstruction }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate post')
      }

      const data = await response.json()
      setGeneratedPost(data.post)
    } catch (error) {
      console.error('Error generating post:', error)
      setAlert({ type: 'error', message: 'Failed to generate post. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      const tempElement = document.createElement('div')
      tempElement.innerHTML = generatedPost
      const textContent = tempElement.textContent || tempElement.innerText || ''
      await navigator.clipboard.writeText(textContent)
      setAlert({ type: 'success', message: 'Post copied to clipboard!' })
    } catch (err) {
      console.error('Failed to copy text: ', err)
      setAlert({ type: 'error', message: 'Failed to copy text. Please try again.' })
    }
  }

  return (
    <div>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-black text-white py-6 px-8 shadow-lg z-10">
        <div className="flex items-center justify-between">
          {/* Caption */}
          <h1 className="text-2xl font-bold">Social Media Post Generator</h1>

          {/* Navigation Links */}
          <nav className="space-x-6">
            <a href="/" className="hover:underline">Home</a>
            <a href="/about" className="hover:underline">About</a>
            <a href="/services" className="hover:underline">Services</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content with padding for fixed header */}
      <div className="container mx-auto p-4 pt-24">
        {alert && (
          <Alert variant={alert.type === 'error' ? 'destructive' : 'default'} className="mb-4">
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Generate Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select onValueChange={setPlatform}>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter your topic" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialInstruction">Special Instructions (Optional)</Label>
                <Textarea
                  id="specialInstruction"
                  value={specialInstruction}
                  onChange={(e) => setSpecialInstruction(e.target.value)}
                  placeholder="Enter any special instructions"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Post'}
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Generated Post</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedPost ? (
                <div dangerouslySetInnerHTML={{ __html: generatedPost }} className="prose dark:prose-invert max-w-none" />
              ) : (
                <p className="text-muted-foreground">Your generated post will appear here.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleCopy} className="flex items-center gap-2" disabled={!generatedPost}>
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 bg-gray-900 text-white py-6 px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 YourCompany. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
