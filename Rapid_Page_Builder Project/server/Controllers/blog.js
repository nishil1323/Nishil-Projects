const express = require("express")
const router = express.Router();
const Blog = require("../Schemas/Blog");
const dbconnect = require("../Database/DBConnect");
const { route } = require("./Registration");

router.post("/addBlog", async (req, res) => {
    try {
        dbconnect();
        const newBlog = await Blog.create({
            owner: req.body.owner,
            title: req.body.title,
            subText: req.body.subText,
            body: req.body.body,
            url: req.body.url,
            author: req.body.author,
            showAuthor: req.body.showAuthor,
            blogStatus: req.body.blogStatus
        })
        res.status(200).json(newBlog)
    } catch (error) {
        console.log(error);
    }
})

router.post("/getBlogs", async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email)
        const blogArrs = await Blog.find({
            owner: email
        },
        {
            _id:1,
            title : 1,
            url : 1,
            owner : 1,
            blogStatus : 1,
            createdAt : 1,
            subText : 1,
            body: 1,
            showAuthor:1,
            author : 1
        }
        )
        console.log(blogArrs)
        res.status(200).json({ arr: blogArrs })
    } catch (error) {
        console.log(error);
    }
})

router.post("/deleteBlog", async (req,res)=>{
    try {
        console.log("deleting ", req.body.id);
        await Blog.deleteOne({_id: req.body.id});
        req.status(200).json({msg:"Deleted the Blog"})
    } catch (error) {
        console.log(error);
    }
})

router.post("/getSingularBlog", async (req,res)=>{
    try {
        console.log("fetching ", req.body.id);
        const blog = await Blog.findById({_id: req.body.id});
        req.status(200).json(blog)
    } catch (error) {
        console.log(error);
    }
})

// router.put("/editBlog/:id", async (req, res) => {
//     try {
//         const blogId = req.params.id;
//         const {
//             title,
//             subText,
//             body,
//             url,
//             author,
//             showAuthor,
//             blogStatus
//         } = req.body;

//         const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
//             title,
//             subText,
//             body,
//             url,
//             author,
//             showAuthor,
//             blogStatus
//         }, { new: true });

//         if (!updatedBlog) {
//             return res.status(404).json({ msg: "Blog not found" });
//         }

//         res.status(200).json(updatedBlog);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// });


module.exports = router;