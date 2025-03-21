import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/button"
import { Grid, MessageCircle, MoreHorizontal, Settings } from "lucide-react"
import pdp from "@/app/assets/instagprofile/pdp.jpg"
import post1 from "@/app/assets/instagprofile/post1.jpg"
import post2 from "@/app/assets/instagprofile/post2.jpg"
import post3 from "@/app/assets/instagprofile/post3.jpg"
import story1 from "@/app/assets/instagprofile/story1.jpg"
import story2 from "@/app/assets/instagprofile/story2.jpg"
import story3 from "@/app/assets/instagprofile/story3.jpg"
const instaImages=[
    post1,post2,post3
    ]

const storyImages=[
story1,story2,story3
    ]
export default function InstagramProfile() {
  return (
    <div className="max-w-md mx-auto  bg-black rounded-lg overflow-hidden shadow-sm  ">

      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">houseofideas.club</span>
        </div>

      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-start">

          <Avatar className="h-20 w-20 border-2 border-white">
            <AvatarImage src={pdp.src} alt="Profile picture" />
            <AvatarFallback>HI</AvatarFallback>
          </Avatar>

          {/* Stats */}
          <div className="flex-1 ml-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">houseofideas.club</span>
              <div className="flex space-x-2">

                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>


            <div className="flex space-x-4 text-sm">
              <div>
                <span className="font-semibold">305</span> posts
              </div>
              <div>
                <span className="font-semibold">11.5k</span> followers
              </div>
              <div>
                <span className="font-semibold">61</span> following
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <div className="font-semibold">House of Ideas Club</div>
            <div className="text-sm mt-1">
                House of Ideas Club
                Welcome to HI club✨
                - Turning your ideas into projects 💸.

                <br/> 📩hoi.univalger3@gmail.com
                <br/>
                <h1  className="text-white font-bold">
                    www.houseofideas.club
                </h1>
            </div>
        </div>
      </div>


      <div className="px-4 py-2 border-t overflow-x-auto">
        <div className="flex space-x-4">
          {storyImages.map((item,i) => (
            <div key={i} className="flex flex-col items-center">
              <Avatar className="h-16 w-16 border-2  border-gray-200 p-0.5">
                <AvatarImage className='rounded-full' src={item.src}  />
                <AvatarFallback>S{item.src}</AvatarFallback>
              </Avatar>

            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t">
        <button className="flex-1 py-3 flex justify-center border-t-2 border-black">
          <Grid className="h-5 w-5" />
        </button>
        <button className="flex-1 py-3 flex justify-center text-gray-400">
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>


      <div className="grid grid-cols-3 gap-0.5">
        {instaImages.map((img, i) => (
          <div key={i} className="aspect-square bg-gray-100">
            <img
              src={img.src}
              alt={`Post ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

