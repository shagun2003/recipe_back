import comment from "../model/comment.js"
export const newComment=async(req,res)=>
    {
            try{
              const comm= await new comment(req.body);
              comm.save();
              return res.status(200).json({msg:'post saved successfully'});
            }
            catch(error)
            {
                return res.status(500).json({error:error.message});
            }
    }
    export const getComments = async (request, response) => {
        try {
            const comments = await comment.find({ postId: request.params.id });
            
            response.status(200).json(comments);
        } catch (error) {
            response.status(500).json(error)
        }
    }
    export const deleteComment = async (request, response) => {
        try {
            const comments = await comment.findById(request.params.id);
            await comment.findByIdAndDelete(comments._id)
            response.status(200).json('comment deleted successfully');
        } catch (error) {
            response.status(500).json(error)
        }
    }