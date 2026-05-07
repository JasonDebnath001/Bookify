"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, ImagePlus, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type BookUploadFormValues } from "@/types";
import { UploadSchema } from "@/lib/zod";

const voiceGroups = [
  {
    label: "Male Voices",
    voices: [
      {
        value: "dave",
        name: "Dave",
        description: "Deep and steady with warm narration.",
      },
      {
        value: "daniel",
        name: "Daniel",
        description: "Clear, thoughtful, and confident.",
      },
      {
        value: "chris",
        name: "Chris",
        description: "Smooth, energetic, and engaging.",
      },
    ],
  },
  {
    label: "Female Voices",
    voices: [
      {
        value: "rachel",
        name: "Rachel",
        description: "Soft, polished, and reassuring.",
      },
      {
        value: "sarah",
        name: "Sarah",
        description: "Bright, welcoming, and expressive.",
      },
    ],
  },
];

const UploadForm = () => {
  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      pdfFile: undefined,
      coverImage: undefined,
      title: "",
      author: "",
      assistantVoice: "rachel",
    },
  });

  const { control, handleSubmit, setValue, watch, formState } = form;
  const { errors, isSubmitting } = formState;
  const pdfFile = watch("pdfFile");
  const coverImage = watch("coverImage");

  const onSubmit = async (values: BookUploadFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Book upload values:", values);
  };

  const pdfDropzoneClass = useMemo(
    () => `upload-dropzone ${pdfFile ? "upload-dropzone-uploaded" : ""}`,
    [pdfFile],
  );

  const coverDropzoneClass = useMemo(
    () => `upload-dropzone ${coverImage ? "upload-dropzone-uploaded" : ""}`,
    [coverImage],
  );

  return (
    <div className="new-book-wrapper">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="pdfFile"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel htmlFor="pdf-upload">Upload Book PDF</FormLabel>
              <div>
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    field.onChange(file);
                  }}
                />
                <label htmlFor="pdf-upload" className={pdfDropzoneClass}>
                  <FileText className="upload-dropzone-icon" />
                  {field.value ? (
                    <div className="flex items-center gap-3">
                      <span className="upload-dropzone-text">
                        {field.value.name}
                      </span>
                      <button
                        type="button"
                        className="upload-dropzone-remove"
                        onClick={() => {
                          setValue("pdfFile", undefined as unknown as File, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="upload-dropzone-text">
                        Click to upload PDF
                      </div>
                      <div className="upload-dropzone-hint">
                        PDF file (max 50MB)
                      </div>
                    </>
                  )}
                </label>
              </div>
              {errors.pdfFile?.message ? (
                <FormMessage className="text-sm text-red-600">
                  {errors.pdfFile.message}
                </FormMessage>
              ) : null}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="coverImage"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel htmlFor="cover-upload">
                Upload Book Cover Image
              </FormLabel>
              <div>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    field.onChange(file);
                  }}
                />
                <label htmlFor="cover-upload" className={coverDropzoneClass}>
                  <ImagePlus className="upload-dropzone-icon" />
                  {field.value ? (
                    <div className="flex items-center gap-3">
                      <span className="upload-dropzone-text">
                        {field.value.name}
                      </span>
                      <button
                        type="button"
                        className="upload-dropzone-remove"
                        onClick={() => {
                          setValue("coverImage", undefined, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="upload-dropzone-text">
                        Click to upload cover image
                      </div>
                      <div className="upload-dropzone-hint">
                        Leave empty to auto-generate from PDF
                      </div>
                    </>
                  )}
                </label>
              </div>
              {errors.coverImage?.message ? (
                <FormMessage className="text-sm text-red-600">
                  {errors.coverImage.message}
                </FormMessage>
              ) : null}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel htmlFor="title">Title</FormLabel>
              <FormControl>
                <input
                  id="title"
                  type="text"
                  placeholder="ex: Rich Dad Poor Dad"
                  className="form-input"
                  {...field}
                />
              </FormControl>
              {errors.title?.message ? (
                <FormMessage className="text-sm text-red-600">
                  {errors.title.message}
                </FormMessage>
              ) : null}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="author"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel htmlFor="author">Author Name</FormLabel>
              <FormControl>
                <input
                  id="author"
                  type="text"
                  placeholder="ex: Robert Kiyosaki"
                  className="form-input"
                  {...field}
                />
              </FormControl>
              {errors.author?.message ? (
                <FormMessage className="text-sm text-red-600">
                  {errors.author.message}
                </FormMessage>
              ) : null}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="assistantVoice"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Choose Assistant Voice</FormLabel>
              <div className="space-y-6">
                {voiceGroups.map((group) => (
                  <div key={group.label} className="space-y-3">
                    <div className="text-base font-medium text-[#222]">
                      {group.label}
                    </div>
                    <div className="voice-selector-options">
                      {group.voices.map((option) => {
                        const selected = field.value === option.value;
                        return (
                          <label
                            key={option.value}
                            className={`voice-selector-option ${
                              selected
                                ? "voice-selector-option-selected"
                                : "voice-selector-option-default"
                            }`}
                          >
                            <input
                              type="radio"
                              className="hidden"
                              value={option.value}
                              checked={selected}
                              onChange={() => field.onChange(option.value)}
                            />
                            <div className="flex flex-col text-left">
                              <span className="font-semibold text-[#1f1f1f]">
                                {option.name}
                              </span>
                              <span className="text-sm text-[#5f5f5f]">
                                {option.description}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {errors.assistantVoice?.message ? (
                <FormMessage className="text-sm text-red-600">
                  {errors.assistantVoice.message}
                </FormMessage>
              ) : null}
            </FormItem>
          )}
        />

        <button type="submit" className="form-btn">
          Begin Synthesis
        </button>
      </form>

      {isSubmitting ? (
        <div className="loading-wrapper">
          <div className="loading-shadow-wrapper">
            <div className="loading-shadow">
              <div className="loading-animation">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full" />
              </div>
              <div className="loading-title">
                Preparing your literary synthesis…
              </div>
              <div className="loading-progress">
                <div className="loading-progress-item">
                  <span className="loading-progress-status" />
                  <span>Uploading files</span>
                </div>
                <div className="loading-progress-item">
                  <span className="loading-progress-status" />
                  <span>Analyzing PDF content</span>
                </div>
                <div className="loading-progress-item">
                  <span className="loading-progress-status" />
                  <span>Crafting your interview experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UploadForm;
