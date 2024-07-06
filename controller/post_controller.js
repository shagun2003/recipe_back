
import Post from "../model/post.js"
export const createPost=async(req,res)=>
    {
        try
       { 
        const post= await new Post(req.body);
        post.save();
        return res.status(200).json('post saved successfully');
    }
    catch(error)
    {
        return res.status(500).json(error); 
    }
    }
    export const Allpost = async (req, res) => {
        let category=req.query.category;
        let poste;
        try {
            if(category)
                {
                   poste=await Post.find({categories:category})
                }
                else{
                 poste = await Post.find({});
                }
            
            return res.status(200).json(poste);
        } catch (error) {
            console.error('Error fetching posts:', error);
            return res.status(500).json({ msg: error.message });
        }
    }; 
    export const Posti=async(req,res)=>
        {
            try{
                   const post=await Post.findById(req.params.id);
                   return res.status(200).json(post);
            }
            catch(error)
            {
                return res.status(500).json({error:error.message});
            }
        }
        export const updatePost = async (request, response) => {
            try {
                const post = await Post.findById(request.params.id);
        
                if (!post) {
                  return  response.status(404).json({ msg: 'Post not found' });
                }
                
                await Post.findByIdAndUpdate( request.params.id, { $set: request.body })
        
               return response.status(200).json({msg:'post updated successfully'});
            } catch (error) {
                return response.status(500).json(error);
            }
        }
        export const deletePost = async (request, response) => {
            try {
                const post = await Post.findById(request.params.id);
                if (!post) {
                    return  response.status(404).json({ msg: 'Post not found' });
                  }
                
                await Post.findByIdAndDelete(post._id)
        
                return response.status(200).json({msg:'post updated successfully'});
            } catch (error) {
                return response.status(500).json(error);
            }
        }
       