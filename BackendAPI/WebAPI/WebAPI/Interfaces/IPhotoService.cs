﻿using CloudinaryDotNet.Actions;

namespace WebAPI.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo);

        
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
