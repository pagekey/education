import bpy


class PAGEKEY_OT_SlideOperator(bpy.types.Operator):
    bl_idname = "pagekey.slide_add"
    bl_label = "Add video text"

    def execute(self, context):
        scene = context.scene
        text_strip = bpy.context.scene.sequence_editor.sequences.new_effect(
            name="MyText",
            type="TEXT",
            channel=scene.pagekey_slide_props.channel,
            frame_start=scene.pagekey_slide_props.start,
            frame_end=scene.pagekey_slide_props.end,
        )
        text_strip.text = scene.pagekey_slide_props.title
        text_strip.location.x = scene.pagekey_slide_props.x
        text_strip.location.y = scene.pagekey_slide_props.y
        if scene.pagekey_slide_props.red:
            text_strip.color = (1, 0, 0, 1)
        return {'FINISHED'}


class PAGEKEY_SlideProperties(bpy.types.PropertyGroup):
    title: bpy.props.StringProperty(
        name="Title",
        description="Displayed on slide",
        default="The Slide",
        maxlen=1024,
    )
    start: bpy.props.IntProperty(default=1)
    end: bpy.props.IntProperty(default=30)
    channel: bpy.props.IntProperty(default=1)
    x: bpy.props.FloatProperty(default=0.5)
    y: bpy.props.FloatProperty(default=0.5)
    red: bpy.props.BoolProperty()


class PAGEKEY_PT_SlidePanel(bpy.types.Panel):
    bl_idname = "PAGEKEY_PT_SlidePanel"
    
    bl_category = "PageKey"
    bl_label = "Slide Panel"
    bl_space_type = 'SEQUENCE_EDITOR'
    bl_region_type = 'UI'

    def draw(self, context):
        self.layout.label(text="Use the form to add a slide.")
        self.layout.prop(context.scene.pagekey_slide_props, "title")
        self.layout.prop(context.scene.pagekey_slide_props, "start")
        self.layout.prop(context.scene.pagekey_slide_props, "end")
        self.layout.prop(context.scene.pagekey_slide_props, "channel")
        self.layout.prop(context.scene.pagekey_slide_props, "x")
        self.layout.prop(context.scene.pagekey_slide_props, "y")
        self.layout.prop(context.scene.pagekey_slide_props, "red")
        self.layout.operator("pagekey.slide_add", text="Add Text")

bl_info = {
    "name": "PageKey VSE Text Adder",
    "blender": (2, 80, 0),
    "category": "Object",
}
def register():
    bpy.utils.register_class(PAGEKEY_OT_SlideOperator)
    bpy.utils.register_class(PAGEKEY_SlideProperties)
    bpy.utils.register_class(PAGEKEY_PT_SlidePanel)
    bpy.types.Scene.pagekey_slide_props = bpy.props.PointerProperty(type=PAGEKEY_SlideProperties)

def unregister():
    bpy.utils.unregister_class(PAGEKEY_OT_SlideOperator)
    bpy.utils.unregister_class(PAGEKEY_SlideProperties)
    bpy.utils.unregister_class(PAGEKEY_PT_SlidePanel)
    del bpy.types.Scene.pagekey_slide_props

if __name__ == "__main__":
    register()
