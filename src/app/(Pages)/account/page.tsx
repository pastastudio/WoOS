'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className='grid grid-cols-[auto_1fr] gap-8'>
      {/* Sidebar */}
      <div className='bg-muted w-48 rounded-lg p-4'>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation='vertical'
        >
          <TabsList className='flex h-auto w-full flex-col gap-2'>
            <TabsTrigger
              value='profile'
              className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card w-full justify-center'
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value='appearance'
              className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card w-full justify-center'
            >
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value='account'
              className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card w-full justify-center'
            >
              Account
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsContent value='profile'>
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-6'>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-20 w-20'>
                    <AvatarImage src='' alt='Profile' />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div className='text-sm'>
                    <div className='font-medium'>Profile Settings</div>
                    <div className='text-muted-foreground'>
                      Your avatar is provided by your third party account
                    </div>
                  </div>
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' placeholder='' />
                  <p className='text-muted-foreground text-xs'>
                    This is your public display name. It can be your real name
                    or a pseudonym.
                  </p>
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' type='email' placeholder='' disabled />
                  <p className='text-muted-foreground text-xs'>
                    Your email address cannot be changed.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='appearance'>
            <Card>
              <CardHeader>
                <CardTitle>Apperace Settings</CardTitle>
                <CardDescription>
                  Change your Apperace for the Website
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-6'>
                <div className='grid gap-3'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <Label htmlFor='headers'>Headers</Label>
                      <Select>
                        <SelectTrigger id='headers'>
                          <SelectValue placeholder='Select color' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='red'>Red</SelectItem>
                          <SelectItem value='blue'>Blue</SelectItem>
                          <SelectItem value='green'>Green</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor='sections'>Sections</Label>
                      <Select>
                        <SelectTrigger id='sections'>
                          <SelectValue placeholder='Select color' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='red'>Red</SelectItem>
                          <SelectItem value='blue'>Blue</SelectItem>
                          <SelectItem value='green'>Green</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor='text'>Text</Label>
                      <Select>
                        <SelectTrigger id='text'>
                          <SelectValue placeholder='Select color' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='red'>Red</SelectItem>
                          <SelectItem value='blue'>Blue</SelectItem>
                          <SelectItem value='green'>Green</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='cursor'>Wand (Cursor)</Label>
                  <Input id='cursor' placeholder='' />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='account'>
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions that will affect your account
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-6'>
                <div className='grid gap-3'>
                  <h3 className='font-semibold'>Delete Account</h3>
                  <p className='text-muted-foreground text-sm'>
                    Irreversible actions that will affect your account
                  </p>
                  <div className='flex gap-3'>
                    <Button variant='destructive'>Delete Account</Button>
                    <Button variant='outline'>Delete Data</Button>
                    <Button variant='outline'>Download Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
